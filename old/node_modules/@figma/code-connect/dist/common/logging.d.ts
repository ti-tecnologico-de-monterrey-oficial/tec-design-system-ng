import chalk from 'chalk';
export declare const error: chalk.Chalk;
export declare const success: chalk.Chalk;
export declare const info: chalk.Chalk;
export declare const warn: chalk.Chalk;
export declare const debug: chalk.Chalk;
export declare const verbose: chalk.Chalk;
export declare const highlight: chalk.Chalk;
export declare const reset: chalk.Chalk;
export declare const underline: chalk.Chalk;
export declare enum LogLevel {
    Nothing = 0,
    Error = 1,
    Warn = 2,
    Info = 3,
    Debug = 4
}
export declare const logger: {
    setLogLevel: (level: LogLevel) => void;
    error: (...msgs: unknown[]) => void;
    warn: (...msgs: unknown[]) => void;
    info: (...msgs: unknown[]) => void;
    infoForce: (...msgs: unknown[]) => void;
    debug: (...msgs: unknown[]) => void;
};
/**
 * Exit the process with an error message. The `never` type tells TypeScript
 * that code after this will not be executed.
 *
 * @param msg Error message
 * @param errorCode Optional command exit code, defaults to 1
 */
export declare function exitWithError(msg: string, errorCode?: number): never;
//# sourceMappingURL=logging.d.ts.map