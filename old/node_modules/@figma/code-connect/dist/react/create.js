"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isBooleanKind = isBooleanKind;
exports.generateExpressionFromIntrinsic = generateExpressionFromIntrinsic;
exports.getSetOfAllPropsReferencedInPropMapping = getSetOfAllPropsReferencedInPropMapping;
exports.generateProps = generateProps;
exports.createReactCodeConnect = createReactCodeConnect;
const lodash_1 = require("lodash");
const prettier = __importStar(require("prettier"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const create_1 = require("../connect/create");
const intrinsics_1 = require("../connect/intrinsics");
const create_common_1 = require("../connect/create_common");
function isBooleanKind(propValue) {
    const normalized = propValue.toLowerCase();
    return (normalized === 'true' ||
        normalized === 'false' ||
        normalized === 'yes' ||
        normalized === 'no' ||
        normalized === 'on' ||
        normalized === 'off');
}
function normalizePropName(name) {
    return name.replace(/#[0-9:]*/g, '');
}
function generateCodePropName(name) {
    const cleanedName = name
        // Remove any #node:id from the end of the string
        .replace(/#[0-9:]+$/g, '')
        // Remove any special characters
        .replace(/[^a-zA-Z0-9\s]/g, '');
    return (0, lodash_1.camelCase)(cleanedName);
}
function normalizePropValue(name) {
    // Convert the string to kebab-case
    return name.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
}
function generateExpressionValueMappingKind(valueMappingKind) {
    if (valueMappingKind && typeof valueMappingKind === 'object' && 'kind' in valueMappingKind) {
        return generateExpressionFromIntrinsic(valueMappingKind);
    }
    if (typeof valueMappingKind === 'string') {
        return `"${valueMappingKind}"`;
    }
    if (typeof valueMappingKind === 'number' ||
        typeof valueMappingKind === 'boolean' ||
        typeof valueMappingKind === 'undefined') {
        return `${valueMappingKind}`;
    }
}
function generateExpressionValueMapping(valueMapping) {
    return `{
  ${Object.entries(valueMapping)
        .map(([k, v]) => `"${k}": ${generateExpressionValueMappingKind(v)}`)
        .join(`,\n`)}
}`;
}
// Not an exhaustive list of intrinsics but can add others as/when they're supported in prop mapping gen
function generateExpressionFromIntrinsic({ kind, args }) {
    if (kind === intrinsics_1.IntrinsicKind.String) {
        return `figma.string("${args.figmaPropName}")`;
    }
    if (kind === intrinsics_1.IntrinsicKind.Boolean) {
        return `figma.boolean("${args.figmaPropName}"${args.valueMapping ? `, ${generateExpressionValueMapping(args.valueMapping)}` : ''})`;
    }
    if (kind === intrinsics_1.IntrinsicKind.Enum) {
        return `figma.enum("${args.figmaPropName}"${args.valueMapping ? `, ${generateExpressionValueMapping(args.valueMapping)}` : ''})`;
    }
    if (kind === intrinsics_1.IntrinsicKind.Instance) {
        return `figma.instance("${args.figmaPropName}")`;
    }
    if (kind === intrinsics_1.IntrinsicKind.Children) {
        return `figma.children(${args.layers.length > 1 ? `[${args.layers.map((layer) => `"${layer}"`).join(', ')}]` : `"${args.layers[0]}"`})`;
    }
    if (kind === intrinsics_1.IntrinsicKind.TextContent) {
        return `figma.textContent("${args.layer}")`;
    }
    // should never reach here as we create prop mappings.
    throw new Error(`kind ${kind} not supported for prop mapping`);
}
function generateSinglePropMappingFromFigmaProp(propName, propDef) {
    const codePropName = generateCodePropName(propName);
    const figmaPropName = normalizePropName(propName);
    if (propDef.type === 'BOOLEAN') {
        return `"${codePropName}": figma.boolean('${figmaPropName}')`;
    }
    if (propDef.type === 'TEXT') {
        return `"${codePropName}": figma.string('${figmaPropName}')`;
    }
    if (propDef.type === 'VARIANT') {
        const isBooleanVariant = propDef.variantOptions?.length === 2 && propDef.variantOptions.every(isBooleanKind);
        if (isBooleanVariant) {
            return `"${codePropName}": figma.boolean('${figmaPropName}')`;
        }
        else {
            return `"${codePropName}": figma.enum('${figmaPropName}', { \n${propDef.variantOptions
                ?.map((value) => `  "${value}": "${normalizePropValue(value)}"`)
                .join(',\n')}\n})`;
        }
    }
    if (propDef.type === 'INSTANCE_SWAP') {
        return `"${codePropName}": figma.instance('${figmaPropName}')`;
    }
    return null;
}
function getSetOfAllPropsReferencedInPropMapping(obj) {
    const mappedProps = [];
    Object.entries(obj).forEach(([k, v]) => {
        if (k === 'figmaPropName') {
            mappedProps.push(v);
        }
        if (typeof v === 'object') {
            mappedProps.push(...getSetOfAllPropsReferencedInPropMapping(v));
        }
    });
    return new Set(mappedProps);
}
function generatePropsFromMapping(component, propMapping) {
    const mappedProps = [];
    const unmappedProps = [];
    for (const [propName, intrinsic] of Object.entries(propMapping)) {
        const expr = generateExpressionFromIntrinsic(intrinsic);
        if (expr) {
            mappedProps.push(`"${propName}": ${expr}`);
        }
    }
    const usedFigmaPropsSet = getSetOfAllPropsReferencedInPropMapping(propMapping);
    for (const [propName, propDef] of Object.entries(component.componentPropertyDefinitions || {})) {
        if (!usedFigmaPropsSet.has(propName)) {
            const propMapping = generateSinglePropMappingFromFigmaProp(propName, propDef);
            if (propMapping) {
                unmappedProps.push(propMapping);
            }
        }
    }
    return `{
${mappedProps.length
        ? `// These props were automatically mapped based on your linked code:
  ${mappedProps.join(',\n')},`
        : ''}
  ${unmappedProps.length
        ? `// No matching props could be found for these Figma properties:
  ${unmappedProps
            .map((prop) => {
            // Comment out to make clear these are suggested. Singly-commented out lines for ease of uncommenting
            return `// ${prop.replace(/\n/g, '\n// ')}`;
        })
            .join(',\n')}`
        : ''}
  }`;
}
function generateProps(component) {
    const props = [];
    if (!component.componentPropertyDefinitions ||
        Object.keys(component.componentPropertyDefinitions).length === 0) {
        return `{}`;
    }
    for (const [propName, propDef] of Object.entries(component.componentPropertyDefinitions)) {
        const propMapping = generateSinglePropMappingFromFigmaProp(propName, propDef);
        if (propMapping) {
            props.push(propMapping);
        }
    }
    return `{
  ${props.join(',\n  ')}
}`;
}
function generateExample(component, signature, propMapping) {
    if (!signature) {
        return `<${component} />`;
    }
    const props = Object.entries(signature)
        .map(([propName, propDef]) => {
        // Children are rendered inside of the example body rather than in a prop
        if (propName === 'children') {
            return null;
        }
        else if (propMapping && propMapping[propName]) {
            return `${propName}={props.${propName}}`;
        }
        else if (!propDef.startsWith('?')) {
            return `${propName}={/* TODO */} `;
        }
        else {
            return null;
        }
    })
        .filter(Boolean)
        .join('\n');
    // const childProp = propMapping?['children'] ? `{props.${propMapping['children']}}` : null
    // Nest child props inside of the element
    if (signature['children'] && propMapping?.['children']) {
        return `<${component}
  ${props}>
  {props.children}
  </${component}>`;
    }
    else {
        return `<${component}
  ${props}/>`;
    }
}
// returns ES-style import path from given system path
function formatImportPath(systemPath) {
    // use forward slashes for import paths
    let formattedImportPath = systemPath.replaceAll(path_1.default.sep, '/');
    // prefix current dir paths with ./ (node path does not)
    if (!formattedImportPath.startsWith('.')) {
        formattedImportPath = `./${formattedImportPath}`;
    }
    // assume not using ESM imports
    return formattedImportPath.replace(/\.(jsx|tsx)$/, '');
}
function getImportsPath({ codeConnectFilePath, sourceFilepath, normalizedName, }) {
    if (!sourceFilepath) {
        return `./${normalizedName}`;
    }
    const codeConnectFolder = path_1.default.dirname(codeConnectFilePath);
    const pathToComponentFile = path_1.default.relative(codeConnectFolder, sourceFilepath);
    return formatImportPath(pathToComponentFile);
}
async function createReactCodeConnect(payload) {
    const { figmaConnections, destinationFile, destinationDir, sourceFilepath, normalizedName } = payload;
    const comments = {
        MAPPED_PROPS: `
  * \`props\` includes a mapping from your code props to Figma properties.
  * You should check this is correct, and update the \`example\` function
  * to return the code example you'd like to see in Figma`,
        NO_MAPPED_PROPS: `
  * None of your props could be automatically mapped to Figma properties.
  * You should update the \`props\` object to include a mapping from your
  * code props to Figma properties, and update the \`example\` function to
  * return the code example you'd like to see in Figma`,
        DEFAULT: `
  * \`props\` includes a mapping from Figma properties and variants to
  * suggested values. You should update this to match the props of your
  * code component, and update the \`example\` function to return the
  * code example you'd like to see in Figma`,
    };
    const sourceFilename = sourceFilepath
        ? path_1.default.parse(sourceFilepath).name.split('.')[0]
        : normalizedName;
    const filePath = (0, create_common_1.getOutFileName)({
        outFile: destinationFile,
        outDir: destinationDir,
        sourceFilename,
        extension: 'tsx',
    });
    const importsPath = getImportsPath({
        codeConnectFilePath: filePath,
        sourceFilepath,
        normalizedName,
    });
    let defaultImport = '';
    const namedImports = {};
    for (const figmaConnection of figmaConnections) {
        const { sourceExport, component } = figmaConnection;
        const importName = sourceFilepath && sourceExport
            ? sourceExport === 'default'
                ? (0, create_1.normalizeComponentName)(sourceFilename)
                : sourceExport
            : normalizedName;
        if (sourceExport === 'default') {
            defaultImport = importName;
        }
        else {
            namedImports[component.id] = importName;
        }
    }
    if (defaultImport !== '') {
        defaultImport = Object.values(namedImports).includes(defaultImport)
            ? `${defaultImport}Default`
            : defaultImport;
    }
    let codeConnectCode = '';
    for (const figmaConnection of figmaConnections) {
        const { propMapping, sourceExport, component, reactTypeSignature } = figmaConnection;
        const hasAnyMappedProps = propMapping && Object.keys(propMapping).length > 0;
        const commentType = propMapping && hasAnyMappedProps
            ? 'MAPPED_PROPS'
            : propMapping && !hasAnyMappedProps
                ? 'NO_MAPPED_PROPS'
                : 'DEFAULT';
        let comment = comments[commentType];
        let componentName = sourceExport === 'default' ? defaultImport : namedImports[component.id];
        const snippet = `figma.connect(${componentName}, "${component.figmaNodeUrl}", {
      props: ${propMapping ? generatePropsFromMapping(component, propMapping) : generateProps(component)},
      example: (props) => ${generateExample(componentName, reactTypeSignature, propMapping)},
    })`;
        codeConnectCode += `

  /**
   * -- This file was auto-generated by Code Connect --${comment}
   */

  ${snippet}
  `;
    }
    const comma = Object.keys(namedImports).length > 0 && defaultImport ? ',' : '';
    const namedImportList = Object.values(namedImports).length > 0 ? `{${Object.values(namedImports).join(',')}}` : '';
    let codeConnect = `
import React from 'react'
import ${defaultImport} ${comma} ${namedImportList} from '${importsPath}'
import figma from '@figma/code-connect'

${codeConnectCode}
`;
    let formatted = prettier.format(codeConnect, {
        parser: 'typescript',
        semi: false,
        trailingComma: 'all',
    });
    if (fs_1.default.existsSync(filePath)) {
        return {
            createdFiles: [],
            messages: [{ message: `File ${filePath} already exists, skipping creation`, level: 'ERROR' }],
        };
    }
    fs_1.default.mkdirSync(path_1.default.dirname(filePath), { recursive: true });
    fs_1.default.writeFileSync(filePath, formatted);
    return { createdFiles: [{ filePath }], messages: [] };
}
//# sourceMappingURL=create.js.map