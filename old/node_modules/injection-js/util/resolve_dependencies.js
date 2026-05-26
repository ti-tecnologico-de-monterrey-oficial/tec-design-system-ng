import { ReflectiveInjector } from '../reflective_injector';
/**
 * This utility function receives a spread of injectable classes
 * and returns an array of all their dependencies. Also resolves
 * optional dependencies.
 *
 * ### Important:
 *
 * Dynamically resolving dependencies using this function
 * will not play nice with static analysis tools, including tree-shaking.
 * From a static analysis perspective, any dependencies which are only resolved
 * using this function will look as though they are not used (and will be
 * removed by tree-shaking). This *severely* limits the usefulness of this function.
 *
 * ### Example:
 *
 * ```typescript
 * class HTTP {}
 * class Database {}
 *
 * // commenting out the decorator because the `@` symbol is spoiling
 * // jsDoc rendering in vscode
 * // @Injectable()
 * class PersonService {
 *   constructor(
 *     private http: HTTP,
 *     private database: Database,
 *   ) {}
 * }
 *
 * // @Injectable()
 * class OrganizationService {
 *   constructor(
 *     private http: HTTP,
 *     private personService: PersonService,
 *   ) {}
 * }
 *
 * const injector = ReflectiveInjector.resolveAndCreate(
 *   resolveDependencies(OrganizationService)
 * );
 *
 * const organizationService = injector.get(OrganizationService);
 * ```
 */
export function resolveDependencies(...inputs) {
    const deps = new Set();
    function resolver(klass) {
        if (deps.has(klass))
            return;
        deps.add(klass);
        // resolve all dependencies of the provided class and run the `resolver()` function
        // on their constructor functions.
        ReflectiveInjector.resolve([klass])
            .reduce((a, x) => a.concat(x.resolvedFactories), [])
            .reduce((a, r) => a.concat(r.dependencies), [])
            .forEach((d) => resolver(d.key.token));
    }
    for (const input of inputs) {
        resolver(input);
    }
    return Array.from(deps);
}
//# sourceMappingURL=resolve_dependencies.js.map