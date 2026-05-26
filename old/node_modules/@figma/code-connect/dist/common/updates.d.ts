import { BaseCommand } from '../commands/connect';
import { Command } from 'commander';
type CommandArgs<T extends BaseCommand> = [...any[], T, Command];
export declare function withUpdateCheck<T extends BaseCommand>(fn: (...args: any[]) => void | Promise<void>): (...args: CommandArgs<T>) => void | Promise<void>;
export declare function exitWithUpdateCheck(errorCode?: number): never;
export declare function updateCli(): void;
export {};
//# sourceMappingURL=updates.d.ts.map