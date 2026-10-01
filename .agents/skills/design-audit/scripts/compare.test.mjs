import { selectedFigmaNode, discoverScopeVariants } from './discovery.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import { compareInterior } from './compare.mjs';
test('informe interno limita propiedades y omite padding anidado y tamaños de imágenes', () => {
  const node = {
    id: 'root',
    name: 'Card',
    absoluteBoundingBox: { width: 100, height: 100 },
    children: [
      {
        id: 'text',
        name: 'Título',
        type: 'TEXT',
        characters: 'Hola',
        style: { fontSize: 16 },
      },
      { id: 'container', name: 'Contenido', type: 'FRAME', paddingLeft: 24 },
      {
        id: 'photo',
        name: 'Foto',
        type: 'RECTANGLE',
        fills: [{ type: 'IMAGE' }],
        absoluteBoundingBox: { width: 80, height: 40 },
      },
    ],
  };
  const dom = [
    { figmaNodeId: 'root', props: { width: 300, height: 300 } },
    {
      leaf: true,
      tag: 'SPAN',
      selector: '.title',
      props: { text: 'Hola', fontSize: 12 },
    },
    { figmaNodeId: 'container', props: { paddingLeft: 8 } },
    { tag: 'IMG', props: { width: 70, height: 40 } },
  ];
  const { findings } = compareInterior(node, dom, 1);
  assert.deepEqual(
    findings.map((f) => f.property),
    ['fontSize'],
  );
  assert.match(findings[0].recommendation, /Título.*12 a 16 px/);
});
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
test('equivalencias confirmadas y Responsive/Mobile sin confundir otras familias', () => {
  const variants = [
    {
      node: {
        id: 'd',
        name: 'Template_GenericCard_Informative_Simple',
        componentProperties: { Device: { value: 'Desktop' } },
      },
    },
    {
      node: {
        id: 'm',
        name: 'Template_GenericCard_Informative_Simple',
        componentProperties: { Device: { value: 'Responsive' } },
      },
    },
    {
      node: {
        id: 'i',
        name: 'Template_GenericCard_Informative_ItemList',
        componentProperties: { Device: { value: 'Mobile' } },
      },
    },
    {
      node: {
        id: 'home',
        name: 'Template_HomeCard_ContainerButton_ActionIcon',
      },
    },
  ];
  const cases = associateVariants(variants, [
    {
      title: 'Templates/Generic card/Flat',
      name: 'Desktop',
    },
    {
      title: 'Templates/Generic card/Flat',
      name: 'Mobile',
    },
    { title: 'Templates/Generic card/Informative item list', name: 'Mobile' },
    { title: 'Templates/Generic card/Home', name: 'Desktop' },
  ]);
  assert.deepEqual(
    cases.map((c) => c.variant?.node.id),
    ['d', 'm', 'i', undefined],
  );
  const duplicated = associateVariants(
    [variants[0], { node: { ...variants[0].node, id: 'copy' } }],
    [
      {
        title: 'Templates/Generic card/Flat',
        name: 'Desktop',
      },
    ],
  );
  assert.equal(duplicated[0].variant, undefined);
  assert.deepEqual(duplicated[0].candidateIds, ['d', 'copy']);
});
test('filtra anotaciones aunque el enlace seleccione una sección sin prefijo Template_', () => {
  const root = {
    id: 'section',
    name: 'Templates - Generic Card',
    type: 'SECTION',
    children: [
      {
        id: 'card',
        name: 'Template_GenericCard_Informative',
        type: 'INSTANCE',
      },
      ...Array.from({ length: 3000 }, (_, i) => ({
        id: `note-${i}`,
        name: 'bubble',
        type: 'INSTANCE',
      })),
    ],
  };
  assert.deepEqual(
    discoverScopeVariants(root, root.name).map((v) => v.node.id),
    ['card'],
  );
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

test('descubre documentación completa sin confundir Generic card button ni requerir Desktop/Mobile', () => {
  const entries = [
    {
      id: 'docs',
      type: 'docs',
      title: 'Templates/Generic card',
      storiesImports: ['./external.ts'],
    },
    {
      id: 'flat',
      type: 'story',
      title: 'Templates/Generic card/Flat',
      name: 'Default',
    },
    {
      id: 'actions',
      type: 'story',
      title: 'Templates/Generic card/Actions',
      name: 'Selected',
    },
    {
      id: 'button',
      type: 'story',
      title: 'Templates/Generic card button',
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
      '[Storybook](http://localhost:4400/?path=/docs/templates-generic-card--documentation)',
    ).id,
    'templates-generic-card--documentation',
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
test('distingue documentación y conserva args de la story', () => {
  assert.equal(
    storyLink('http://localhost:4400/?path=/docs/templates-card--documentation')
      .docs,
    true,
  );
  const s = storyLink(
    'https://example.chromatic.com/iframe.html?id=card--default&args=disabled:true',
  );
  assert.equal(s.id, 'card--default');
  assert.equal(s.args, 'disabled:true');
  assert.equal(s.base, 'https://example.chromatic.com/');
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


test('referencia Responsive / Desktop confirmada admite ambas historias, sin generalizar otros estados', () => {
  const variants = [{node:{id:'balance',name:'Template_GenericCard_Informative_Balance'}}];
  const stories = ['Desktop','Mobile'].map(name=>({id:name,title:'Templates/Generic card/Informative balance',name}));
  const cases = associateVariants(variants,stories);
  assert.deepEqual(cases.map(c=>c.variant?.node.id), ['balance','balance']);
  assert.match(cases[0].matchMethod,/confirmada/);
  const unknown = [{node:{id:'focus',name:'Template_GenericCard_Informative_FocusElement'}}];
  assert.ok(associateVariants(unknown,stories.map(s=>({...s,title:'Templates/Generic card/Informative focus element'}))).every(c=>!c.variant));
});

test('lee etiquetas externas del nodo para nombre y dispositivo compartido', () => {
  const box = (x,y,width=200,height=100) => ({x,y,width,height});
  const root = {id:'scope',type:'SECTION',children:[
    {id:'name',type:'TEXT',characters:'Template_GenericCard_Informative_Media_Simple_Horizontal',absoluteBoundingBox:box(0,0,200,16)},
    {id:'devices',type:'TEXT',characters:'Responsive / Desktop',absoluteBoundingBox:box(30,30,140,16)},
    {id:'card',name:'Template_GenericCard_Informative_Media_Simple',type:'INSTANCE',absoluteBoundingBox:box(0,70)},
    {id:'gallery',name:'Template_GenericCard_Informative_Media_Simple',type:'INSTANCE',absoluteBoundingBox:box(700,700)},
  ]};
  const variants=discoverScopeVariants(root,'Cards');
  const stories=['Desktop','Mobile'].map(name=>({title:'Templates/Generic card/Informative media simple horizontal',name}));
  assert.deepEqual(associateVariants(variants,stories).map(c=>c.variant?.node.id),['card','card']);
  assert.deepEqual(variants.find(v=>v.node.id==='gallery').node.auditAnnotation.devices,[]);
  assert.equal(root.children[2].auditAnnotation,undefined);
});

test('encuentra plantillas dentro de envoltorios sin contar sus botones internos', () => {
  const root={id:'scope',type:'SECTION',children:[{id:'wrapper',name:'Documentation',type:'INSTANCE',children:[
    {id:'card',name:'Template_GenericCard_Informative_Balance',type:'FRAME',children:[{id:'button',name:'Button',type:'INSTANCE'}]},
  ]}]};
  assert.deepEqual(discoverScopeVariants(root,'Cards').map(v=>v.node.id),['card']);
});

test('el frame plural Templates no se confunde con una plantilla individual', () => {
  const root={id:'scope',type:'SECTION',children:[{id:'gallery',name:'Templates_Genericcard_1_(Dark)',type:'FRAME',children:[
    {id:'card',name:'Template_GenericCard_Informative_Balance',type:'INSTANCE'},
  ]}]};
  assert.deepEqual(discoverScopeVariants(root,'Templates - Generic Card').map(v=>v.node.id),['card']);
});


test('excluye botones y descendientes; solo padding principal y tipografía permitida', () => {
  const text={id:'text',name:'Texto',type:'TEXT',characters:'Hola',style:{fontSize:16,fontWeight:500,fontFamily:'A'}};
  const root={id:'root',name:'Template_GenericCard_Informative_ButtonSimple',type:'FRAME',paddingLeft:24,cornerRadius:8,children:[text,
    {id:'button',name:'BmbButton',type:'INSTANCE',children:[{...text,id:'button-text'}]},
  ]};
  const dom=[{figmaNodeId:'root',props:{paddingLeft:8,borderRadius:0}},
    {leaf:true,props:{text:'Hola',fontSize:12,fontWeight:400,fontFamily:'B'}},
    {leaf:true,inButton:true,props:{text:'Hola',fontSize:8,fontWeight:200}},
  ];
  assert.deepEqual(compareInterior(root,dom,1).findings.map(f=>f.property),['paddingLeft','fontSize','fontWeight']);
});
