import { FigmaConnectMeta, ConnectedComponent } from '../connect/api';
type MapType<T> = T extends ConnectedComponent ? React.ReactElement : T extends Function ? T : T extends object ? {
    [K in keyof T]: MapType<T[K]>;
} : T extends Array<infer U> ? MapType<U>[] : T;
export type ReactMeta<P> = FigmaConnectMeta<P, MapType<P>, React.Component | React.ReactElement | string | ((props: any) => React.ReactElement)> & {
    /**
     * A list of import statements that will render in the Code Snippet in Figma.
     * This overrides the auto-generated imports for the component. When this is specified,
     * the `importPaths` option in the config file is also ignored.
     */
    imports?: string[];
};
export {};
//# sourceMappingURL=types.d.ts.map