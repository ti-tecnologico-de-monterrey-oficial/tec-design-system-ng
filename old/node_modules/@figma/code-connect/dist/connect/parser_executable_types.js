"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateResponsePayload = exports.ParseResponsePayload = exports.ParserExecutableMessages = void 0;
const zod_1 = require("zod");
const FigmaConnectLink = zod_1.z.object({
    name: zod_1.z.string(),
    url: zod_1.z.string(),
});
exports.ParserExecutableMessages = zod_1.z.array(zod_1.z.object({
    // DEBUG and INFO messages should be output to console by the CLI for the
    // user to read, according to the current log level setting.
    //
    // If any WARNING or ERROR messages are returned, the CLI can determine
    // whether it should proceed with publishing or not based on configuration
    // and the return code should be zero or non-zero as appropriate.
    //
    // There's no need for a "result" field as we can infer this from the
    // messages.
    level: zod_1.z.union([zod_1.z.literal('DEBUG'), zod_1.z.literal('INFO'), zod_1.z.literal('WARN'), zod_1.z.literal('ERROR')]),
    // Optional type of message which can be displayed highlighted in the output
    type: zod_1.z.string().optional(),
    message: zod_1.z.string(),
    // Optional source location which can be displayed in a standardised form
    sourceLocation: zod_1.z
        .object({
        file: zod_1.z.string(),
        line: zod_1.z.number().optional(),
    })
        .optional(),
}));
// Zod type modelling the response from a Code Connect parser. Zod allows us to
// easily validate the response.
//
// This type somewhat duplicates the `CodeConnectJSON` type from
// `figma_connect.ts`, but as Zod doesn't allow us to fully express recursive
// types such as Intrinsic, we keep this explicit type as well. The `satisfies`
// should ensure the two types stay in sync.
exports.ParseResponsePayload = zod_1.z.object({
    // Array of Code Connect docs parsed from the input files
    docs: zod_1.z.array(zod_1.z.object({
        // The Figma node URL the doc links to
        figmaNode: zod_1.z.string(),
        // Optional component name. This is only used for display purposes
        // so can be omitted if it's not relevant to the language/framework
        component: zod_1.z.string().optional(),
        // Variant restrictions keyed by Figma property name e.g. `{ 'With icon': true }`
        variant: zod_1.z.record(zod_1.z.any()).optional(),
        // Optional source path/URL, which can either be a path on disk, which
        // we'll show as a SCM link, or a URL (e.g. for a Storybook parser which
        // wants to link to the story in Storybook rather than the file in Github)
        source: zod_1.z.string().optional(),
        // Optional source location containing line number information.
        sourceLocation: zod_1.z
            .object({
            // Optional line number to link to. This is only used if type === 'PATH',
            // to generate a link to the correct line
            line: zod_1.z.number(),
        })
            .optional(),
        // The JS template function to use for this doc
        template: zod_1.z.string(),
        templateData: zod_1.z.object({
            // Map of information describing the props used by the template. This is
            // used by the CLI to validate props before publishing.
            //
            // TODO this Zod type is a bit loose - couldn't work out how to model it exactly
            //
            // TODO We could look to extract this from the template somehow instead,
            // (e.g. run it with figma.properties.* stubbed to record accesses) to
            // avoid needing this duplication.
            props: zod_1.z.record(zod_1.z.object({ kind: zod_1.z.string(), args: zod_1.z.any() })),
            // Optional array of imports for this component. These are prepended
            // to the example code, but it's useful to keep them separate e.g. if
            // we ever want to auto-insert imports in VS Code. If more control
            // over imports is required, they can be output directly by the template
            // function. Currently they'd have to be output in the code directly, but
            // the original spec does propose templates being able to return import
            // sections separately (not implemented as there's no UI for this)
            //
            // Right now, there's no way to handle gathering imports from children and
            // post-processing them (e.g. combining multiple imports from the same file
            // into a single import). We could consider some way for templates to do this
            // in future.
            imports: zod_1.z.array(zod_1.z.string()).optional(),
            // Whether the example should be rendered inline if it's a nested instance
            nestable: zod_1.z.boolean().optional(),
        }),
        // The language to use for syntax highlighting
        language: zod_1.z.string(),
        // Label to be used for the example in the UI
        label: zod_1.z.string(),
        // Optional array of links to be displayed in the UI.
        // TODO Not implemented in UI yet
        links: zod_1.z.array(FigmaConnectLink).optional(),
    })),
    // Any info, warning or error messages generated during parsing.
    messages: exports.ParserExecutableMessages,
});
exports.CreateResponsePayload = zod_1.z.object({
    // A list of files created, which can be output to the console
    createdFiles: zod_1.z.array(zod_1.z.object({
        // The absolute path of the created file
        filePath: zod_1.z.string(),
    })),
    // Any info, warning or error messages generated during creation.
    messages: exports.ParserExecutableMessages,
});
//# sourceMappingURL=parser_executable_types.js.map