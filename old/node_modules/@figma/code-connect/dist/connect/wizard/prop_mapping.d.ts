import { ComponentTypeSignature } from '../../react/parser';
import { FigmaRestApi } from '../figma_rest_api';
import { PropMapping } from '../parser_executable_types';
import { ValueMapping } from '../../connect/intrinsics';
import { ComponentMatchResults, MatchableNamesMap } from './prop_mapping_helpers';
/**
 * Used when we should output a placeholder for an unknown value in prop mapping.
 */
export declare const PROPERTY_PLACEHOLDER = "PROPERTY_PLACEHOLDER";
export declare function generateValueMapping(propSignature: string, figmaPropDef: FigmaRestApi.ComponentPropertyDefinition): ValueMapping;
export declare enum MatchableNameTypes {
    Property = 0,
    VariantValue = 1
}
export type MatchableName = {
    type: MatchableNameTypes;
    name: string;
    variantProperty?: string;
};
/**
 * Builds a map of all properties and enum values, indexed by name.
 * @param componentPropertyDefinitions
 * @returns A map of {name: values[]}. Each value is an array to avoid
 * collisions between properties / enum values
 */
export declare function buildMatchableNamesMap(componentPropertyDefinitions?: FigmaRestApi.Component['componentPropertyDefinitions']): MatchableNamesMap;
export declare function generatePropMapping({ componentPropertyDefinitions, signature, componentMatchResults, matchableNamesMap, }: {
    componentPropertyDefinitions: FigmaRestApi.Component['componentPropertyDefinitions'];
    signature: ComponentTypeSignature;
    componentMatchResults?: ComponentMatchResults;
    matchableNamesMap: MatchableNamesMap;
}): PropMapping;
//# sourceMappingURL=prop_mapping.d.ts.map