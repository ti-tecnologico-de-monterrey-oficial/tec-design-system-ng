import { selectedFigmaNode, discoverScopeVariants } from './discovery.mjs';

import test from 'node:test';

import assert from 'node:assert/strict';

import { compareInterior } from './compare.mjs';

import { collapseIdenticalVariants } from './discovery.mjs';

import { figmaTheme } from './matching.mjs';

test('copias idénticas no crean ambigüedad y colores distintos no se colapsan', () => {
  const n = {
    id: 'a',
    name: 'Card',
    type: 'INSTANCE',
    absoluteBoundingBox: { x: 0, y: 0, width: 100, height: 100 },
    fills: [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }],
  };
  const copy = {
    ...n,
    id: 'b',
    absoluteBoundingBox: { ...n.absoluteBoundingBox, x: 200 },
  };
  const light = {
    ...copy,
    id: 'c',
    fills: [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }],
  };
  assert.equal(
    collapseIdenticalVariants([n, copy, light].map((node) => ({ node })))
      .length,
    2,
  );
});

test('tema predominante separa variantes de la misma familia sin exigir estilos idénticos', () => {
  const text = (characters, c) => ({
    type: 'TEXT',
    characters,
    fills: [{ type: 'SOLID', color: { r: c, g: c, b: c } }],
  });
  const node = {
    id: 'dark',
    name: 'Card',
    componentProperties: { Device: { value: 'Desktop' } },
    children: [text('icon', 0.1), text('Mucho contenido descriptivo', 0.9)],
  };
  assert.equal(figmaTheme(node), 'dark');
  const light = {
    ...node,
    id: 'light',
    children: [text('icon', 0.9), text('Mucho contenido descriptivo', 0.2)],
  };
  assert.equal(figmaTheme(light), 'light');
  const features = {
    pixels: [0, 0, 0, 255],
    width: 100,
    height: 100,
    text: '',
    theme: 'dark',
  };
  const cases = [
    {
      entry: { id: 'story', name: 'Desktop' },
      candidateIds: ['dark', 'light'],
    },
  ];
  matchByAppearance(
    cases,
    [{ node }, { node: light }],
    new Map([['story', features]]),
    new Map([
      ['dark', features],
      ['light', features],
    ]),
  );
  assert.equal(cases[0].variant.node.id, 'dark');
});

test('Figma espera sin timeout explícito ni mensajes rutinarios por defecto', async () => {
  let init;
  await requestFigma('files/test/nodes', {}, 'token', {
    fetchImpl: async (u, options) => {
      init = options;
      return { ok: true, json: async () => ({}) };
    },
  });
  assert.equal(init.signal, undefined);
});

import { requestFigma } from './figma-client.mjs';

test('Figma reintenta timeouts y describe la etapa sin exponer secretos', async () => {
  let calls = 0;
  const logs = [];
  const options = {
    log: (s) => logs.push(s),
    sleep: async () => {},
    fetchImpl: async () => {
      calls++;
      if (calls === 1) throw new DOMException('timeout', 'TimeoutError');
      return { ok: true, json: async () => ({ nodes: {} }) };
    },
  };
  assert.deepEqual(
    await requestFigma(
      'files/example/nodes',
      { ids: '1:2' },
      'secret',
      options,
    ),
    { nodes: {} },
  );
  assert.equal(calls, 2);
  assert.ok(!logs.join('').includes('secret'));
  await assert.rejects(
    requestFigma('files/example', {}, 'secret', {
      ...options,
      fetchImpl: async () => {
        throw new DOMException('timeout', 'TimeoutError');
      },
    }),
    /localizar la sección.*2 intentos/,
  );
});

test('Figma no reintenta credenciales rechazadas', async () => {
  let calls = 0;
  await assert.rejects(
    requestFigma('files/example/nodes', {}, 'secret', {
      log: () => {},
      fetchImpl: async () => {
        calls++;
        return {
          ok: false,
          status: 403,
          json: async () => ({ err: 'Token expired' }),
        };
      },
    }),
    /venció/,
  );
  assert.equal(calls, 1);
});

import { matchByAppearance } from './matching.mjs';

test('asocia nombres diferentes por contenido y rechaza parejas visualmente ambiguas', () => {
  const v = { node: { id: '1', name: 'Diseño X' }, label: 'Diseño X' };
  const feature = {
    pixels: [10, 20, 30, 255],
    width: 200,
    height: 100,
    text: 'Contenido identificable',
  };
  const cases = [{ entry: { id: 'unrelated' }, status: 'sin asociación' }];
  matchByAppearance(
    cases,
    [v],
    new Map([['unrelated', feature]]),
    new Map([['1', feature]]),
  );
  assert.equal(cases[0].variant.node.id, '1');
  const ambiguous = [{ entry: { id: 'a' } }, { entry: { id: 'b' } }];
  matchByAppearance(
    ambiguous,
    [v],
    new Map([
      ['a', feature],
      ['b', feature],
    ]),
    new Map([['1', feature]]),
  );
  assert.ok(ambiguous.every((c) => !c.variant));
  assert.ok(ambiguous[0].candidates.length);
  const blank = [{ entry: { id: 'a' } }];
  matchByAppearance(
    blank,
    [v],
    new Map([['a', { ...feature, text: '' }]]),
    new Map([['1', { ...feature, text: '' }]]),
  );
  assert.ok(!blank[0].variant);
});

import {
  discoverStories,
  discoverVariants,
  associateVariants,
} from './discovery.mjs';

test('descubre documentación completa sin confundir Composite sample ni requerir Desktop/Mobile', () => {
  const entries = [
    {
      id: 'docs',
      type: 'docs',
      title: 'Templates/Sample family',
      storiesImports: ['./external.ts'],
    },
    {
      id: 'flat',
      type: 'story',
      title: 'Templates/Sample family/Flat',
      name: 'Default',
    },
    {
      id: 'actions',
      type: 'story',
      title: 'Templates/Sample family/Actions',
      name: 'Selected',
    },
    {
      id: 'button',
      type: 'story',
      title: 'Templates/Composite sample',
      name: 'Default',
    },
    {
      id: 'external',
      type: 'story',
      title: 'Other',
      importPath: './external.ts',
    },
  ];
  const index = Object.fromEntries(entries.map((e) => [e.id, e]));
  assert.deepEqual(
    discoverStories(index, { id: 'docs' }).map((e) => e.id),
    ['flat', 'actions', 'external'],
  );
  assert.throws(() => discoverStories(index, { id: 'missing' }));
});

test('enumera conjuntos y no convierte componentes anidados en variantes independientes', () => {
  const variants = discoverVariants({
    name: 'Cards',
    type: 'SECTION',
    children: [
      {
        name: 'Set',
        type: 'COMPONENT_SET',
        children: [
          {
            id: '1',
            name: 'Flat',
            type: 'COMPONENT',
            children: [{ id: 'nested', name: 'Icon', type: 'INSTANCE' }],
          },
          { id: '2', name: 'Actions', type: 'COMPONENT' },
        ],
      },
    ],
  });
  assert.deepEqual(
    variants.map((v) => v.node.id),
    ['1', '2'],
  );
  const result = associateVariants(variants, [
    { title: 'Cards/Flat', name: 'Default' },
    { title: 'Cards/Actions', name: 'Selected' },
    { title: 'Cards/Unknown', name: 'Default' },
  ]);
  assert.deepEqual(
    result.map((c) => c.status),
    ['asociada', 'asociada', 'sin asociación'],
  );
  assert.ok(
    associateVariants(variants, [
      { title: 'Cards/Flat', name: 'Desktop' },
      { title: 'Cards/Flat', name: 'Mobile' },
    ]).every((c) => !c.variant),
  );
});

test('asocia el único nodo Figma con la única story indicada aunque los nombres difieran', () => {
  const [result] = associateVariants(
    [{ node: { id: 'figma-node', name: 'Referencia' } }],
    [{ id: 'chromatic-story', title: 'Components/Standalone specimen', name: 'Default' }],
  );
  assert.equal(result.variant.node.id, 'figma-node');
  assert.equal(result.entry.id, 'chromatic-story');
  assert.match(result.matchMethod, /Par único indicado/);
});

import {
  figmaLink,
  storyLink,
  compare,
  expected,
  flatten,
  escape,
  figmaError,
} from './compare.mjs';

test('acepta enlaces Markdown y escapes copiados del chat', () => {
  const u =
    'https://www.figma.com/design/LYk8AJb5RjQhRfPmRIdEQ9/Bamboo?node-id=53658-66150';
  assert.equal(figmaLink(`[${u}](${u}\\&t=abc)`).nodeId, '53658:66150');
  assert.equal(
    storyLink(
      '[Storybook](http://localhost:4400/?path=/docs/templates-sample-family--documentation)',
    ).id,
    'templates-sample-family--documentation',
  );
  assert.throws(() => figmaLink(''), /Enlace inválido/);
});

test('explica los rechazos sin imprimir respuestas arbitrarias ni secretos', () => {
  assert.match(figmaError(403, { err: 'Token expired' }), /venció/);
  assert.match(figmaError(403, { err: 'Invalid scope' }), /file_content:read/);
  assert.ok(!figmaError(403, { err: 'secret-value' }).includes('secret-value'));
});

test('extrae Figma y elimina parámetros de sesión', () => {
  assert.deepEqual(
    figmaLink('https://www.figma.com/design/ABC/Test?node-id=12-34&t=secret'),
    {
      fileKey: 'ABC',
      nodeId: '12:34',
      url: 'https://www.figma.com/design/ABC?node-id=12%3A34',
    },
  );
  assert.throws(() =>
    figmaLink('https://attacker.com/design/ABC?node-id=12-34'),
  );
  assert.throws(() => figmaLink('https://figma.com/design/ABC'));
});

test('acepta documentación en Chromatic y conserva parámetros de una story individual', () => {
  assert.equal(
    storyLink('http://localhost:4400/?path=/docs/templates-card--documentation')
      .docs,
    true,
  );
  const s = storyLink(
    'https://65c3b4d1f966b98bb1f4e774-apfeqbzlva.chromatic.com/?path=/docs/templates-sample-family--documentation',
  );
  assert.equal(s.id, 'templates-sample-family--documentation');
  assert.equal(s.docs, true);
  assert.equal(s.base, 'https://65c3b4d1f966b98bb1f4e774-apfeqbzlva.chromatic.com/');
  const story = storyLink(
    'https://example.chromatic.com/iframe.html?id=feature-card--default&args=disabled:true',
  );
  assert.equal(story.id, 'feature-card--default');
  assert.equal(story.args, 'disabled:true');
  assert.throws(() => storyLink('https://user:password@example.com'));
});

test('tolerancias, valores faltantes y rellenos no soportados', () => {
  const n = { name: 'Card', absoluteBoundingBox: { width: 100, height: 40 } };
  assert.equal(
    compare(n, { props: { width: 100.5, height: 40 } }, 1).length,
    0,
  );
  assert.equal(compare(n, { props: { width: 103 } }, 1).length, 0);
  assert.deepEqual(expected({ fills: [{ type: 'GRADIENT_LINEAR' }] }), {});
  assert.equal(
    flatten({ id: '1', children: [{ id: '2', visible: false }] }).length,
    1,
  );
  assert.equal(escape('<script>'), '&lt;script&gt;');
});

test('el enlace limita el alcance aunque la API devuelva padres y hermanos', () => {
  const card = { id: 'card', name: 'Template_Card', type: 'INSTANCE' };
  const other = { id: 'other', type: 'INSTANCE', name: 'Otra tarjeta' };
  const section = { id: 'section', type: 'SECTION', children: [card, other] };
  const response = {
    nodes: {
      card: { document: card },
      section: { document: section },
      other: { document: other },
    },
  };
  assert.equal(selectedFigmaNode(response, 'card'), card);
  assert.deepEqual(
    discoverScopeVariants(selectedFigmaNode(response, 'card'), card.name).map(
      (v) => v.node.id,
    ),
    ['card'],
  );
  assert.equal(selectedFigmaNode(response, 'section'), section);
  assert.throws(() => selectedFigmaNode(response, 'absent'));
  const variants = discoverScopeVariants(
    {
      type: 'SECTION',
      name: 'Cards',
      children: [
        card,
        { id: 'divider', name: 'Divider', type: 'INSTANCE' },
        { id: 'other', name: 'Template_Other', type: 'INSTANCE' },
      ],
    },
    'Template_Card',
  );
  assert.deepEqual(
    variants.map((v) => v.node.id),
    ['card', 'other'],
  );
});

test('textos repetidos con estilo uniforme se miden sin inventar posiciones', () => {
  const layer = {type:'TEXT', characters:'Subtitle', style:{fontSize:16}};
  const node = {id:'root', children:[{...layer,id:'a'},{...layer,id:'b'}]};
  const dom = [0,1].map(index => ({index, leaf:true, props:{text:'Subtitle', fontSize:12}, box:{x:0,y:index*30,width:40,height:20}}));
  const result = compareInterior(node,dom,1);
  assert.equal(result.findings.filter(f=>f.property==='fontSize').length,2);
  assert.ok(result.checkedProperties > 0);
  assert.equal(compareInterior({id:'none'},dom,1).checkedProperties,0);
});

test('encuentra plantillas dentro de envoltorios sin contar sus instancias internas', () => {
  const root={id:'scope',type:'SECTION',children:[{id:'wrapper',name:'Documentation',type:'INSTANCE',children:[
    {id:'card',name:'Template_GenericCard_Informative_Balance',type:'FRAME',children:[{id:'button',name:'Button',type:'INSTANCE'}]},
  ]}]};
  assert.deepEqual(discoverScopeVariants(root,'Cards').map(v=>v.node.id),['card']);
});

test('el frame plural Templates no se confunde con una plantilla individual', () => {
  const root={id:'scope',type:'SECTION',children:[{id:'gallery',name:'Templates_Genericcard_1_(Dark)',type:'FRAME',children:[
    {id:'card',name:'Template_GenericCard_Informative_Balance',type:'INSTANCE'},
  ]}]};
  assert.deepEqual(discoverScopeVariants(root,'Templates - Sample Family').map(v=>v.node.id),['card']);
});

import { associateByContent } from './content-matching.mjs';

test('asocia familias nuevas por contenido y reutiliza copias equivalentes sin depender del nombre interno', () => {
  const node = { id:'a',type:'INSTANCE',name:'Opaque_123',paddingLeft:16,
    componentProperties:{Type:{type:'VARIANT',value:'Base'}},
    children:[{id:'t',type:'TEXT',characters:'Panel title',style:{fontSize:18}}]};
  const variants = [node,{...node,id:'b'}].map(node=>({node}));
  const cases = ['Default','Responsive','Custom'].map((name,i)=>({entry:{id:String(i),name,title:'Components/New Panel'}}));
  const features = new Map(cases.map(c=>[c.entry.id,{texts:['Panel title',...(c.entry.name==='Custom'?['Extra']:[])]}]));
  associateByContent(cases,variants,features,'New Panel');
  assert.ok(cases.every(c=>c.variant?.node.id==='a'));
  assert.deepEqual(cases[2].partialContent,['extra']);
  assert.deepEqual(cases[0].referenceIds,['a','b']);
  variants[1].node={...variants[1].node,paddingLeft:32};
  const ambiguous=[{entry:cases[0].entry}];
  associateByContent(ambiguous,variants,features,'New Panel');
  assert.equal(ambiguous[0].variant,undefined);
  const other=[{entry:{...cases[0].entry,title:'Components/Other'}}];
  associateByContent(other,[variants[0]],features,'New Panel');
  assert.equal(other[0].variant,undefined);
});

test('no confunde variantes de estado ni cantidades diferentes de texto', () => {
  const base={type:'INSTANCE',name:'Opaque',children:[{type:'TEXT',characters:'Label'}]};
  const variants=['Enabled','Disabled'].map((value,i)=>({node:{...base,id:String(i),componentProperties:{State:{type:'VARIANT',value}}}}));
  const cases=[{entry:{id:'a',title:'Components/Panel',name:'Default'}}], features=new Map([['a',{texts:['Label']}]]);
  associateByContent(cases,variants,features,'Panel');
  assert.equal(cases[0].variant,undefined);
  associateByContent(cases,[{node:{...base,children:[...base.children,...base.children]}}],features,'Panel');
  assert.equal(cases[0].variant,undefined);
});
import { auditMode, scopedLayers, variantProperties } from './scope.mjs';
test('modo de auditoría depende de la categoría, no de la familia', () => {
  for (const name of ['Alpha','Beta','Gamma']) {
    assert.equal(auditMode({title:'Components/'+name}),'component');
    assert.equal(auditMode({title:'Templates/'+name}),'template');
  }
});
test('el componente individual revisa dimensiones, radios, padding y tipografía sin exclusiones por nombre', () => {
  const root={id:'root',name:'Specimen',type:'INSTANCE',paddingLeft:16,cornerRadius:8,absoluteBoundingBox:{width:40,height:40},
    children:[{id:'text',type:'TEXT',name:'Label',characters:'Demo',style:{fontSize:16,fontWeight:600}}]};
  const dom=[{isComponentRoot:true,props:{width:24,height:24,paddingLeft:4,borderRadius:2}},
    {figmaNodeId:'text',leaf:true,props:{text:'Demo',fontSize:12,fontWeight:400}}];
  assert.deepEqual(compareInterior(root,dom,1,{mode:'component'}).findings.map(f=>f.property),
    ['width','height','paddingLeft','borderRadius','fontSize','fontWeight']);
});
test('template trata todas las instancias anidadas como límites y mide su separación sin sus estilos internos', () => {
  const nested=(id,x)=>({id,name:id,type:'INSTANCE',paddingLeft:999,absoluteBoundingBox:{x,y:0,width:20,height:20},
    children:[{id:id+'-label',type:'TEXT',characters:'Internal',style:{fontSize:99}}]});
  const root={id:'root',name:'Composition',type:'FRAME',layoutMode:'HORIZONTAL',paddingLeft:16,
    children:[nested('one',0),nested('two',30)]};
  const dom=[{isComponentRoot:true,props:{paddingLeft:8}},
    {figmaNodeId:'one',componentBoundary:true,props:{paddingLeft:1},box:{x:0,y:0,width:20,height:20}},
    {figmaNodeId:'two',componentBoundary:true,props:{paddingLeft:1},box:{x:40,y:0,width:20,height:20}}];
  assert.deepEqual(scopedLayers(root,'template').map(n=>n.id),['root','one','two']);
  const result=compareInterior(root,dom,1,{mode:'template'});
  assert.equal(result.findings.length,2);
  assert.equal(result.findings[0].property,'paddingLeft');
  assert.match(result.findings[1].property,/Separación horizontal/);
  assert.equal(result.findings[1].expected,'10.0 px');
});
test('template mide padding de sus contenedores y textos propios, sin dimensiones ni radios', () => {
  const root={id:'r',name:'Composition',children:[
    {id:'c',type:'FRAME',paddingLeft:16,cornerRadius:10},
    {id:'t',type:'TEXT',characters:'Expected',style:{fontSize:18,fontWeight:500}},
  ]};
  const dom=[{isComponentRoot:true,props:{}},{figmaNodeId:'c',props:{paddingLeft:8,borderRadius:0}},
    {figmaNodeId:'t',props:{text:'Actual',fontSize:12,fontWeight:400}}];
  assert.deepEqual(compareInterior(root,dom,1,{mode:'template'}).findings.map(f=>f.property),['paddingLeft','text','fontSize','fontWeight']);
});
test('propiedades se leen igual de variantes maestras e instancias sin conocer la familia', () => {
  assert.deepEqual(variantProperties({name:'Tone=Muted, State=Enabled'}),{tone:'Muted',state:'Enabled'});
  assert.deepEqual(variantProperties({componentProperties:{'Tone#1':{type:'VARIANT',value:'Muted'}}}),{tone:'Muted'});
});
