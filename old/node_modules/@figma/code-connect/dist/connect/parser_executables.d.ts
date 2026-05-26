import { z } from 'zod';
import { CodeConnectExecutableParserConfig } from './project';
import { ParserExecutableMessages, ParserRequestPayload } from './parser_executable_types';
export declare function callParser(config: CodeConnectExecutableParserConfig, payload: ParserRequestPayload, cwd: string): Promise<object>;
export declare function handleMessages(messages: z.infer<typeof ParserExecutableMessages>): {
    hasErrors: boolean;
};
//# sourceMappingURL=parser_executables.d.ts.map