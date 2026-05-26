import { Project } from 'ts-morph';
export declare function extractSignature({ nameToFind, sourceFilePath, }: {
    nameToFind: string;
    sourceFilePath: string;
}): Record<string, string>;
export declare function extractSignatureFromProject({ tsMorphProject, sourceFilePath, nameToFind, }: {
    tsMorphProject: Project;
    sourceFilePath: string;
    nameToFind: string;
}): Record<string, string>;
//# sourceMappingURL=signature_extraction.d.ts.map