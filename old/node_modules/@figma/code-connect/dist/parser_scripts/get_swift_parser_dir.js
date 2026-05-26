"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSwiftParserDir = getSwiftParserDir;
const child_process_1 = require("child_process");
const logging_1 = require("../common/logging");
const get_file_if_exists_1 = require("./get_file_if_exists");
const path_1 = __importDefault(require("path"));
// Find the location of the Code Connect Swift package on disk, so that we can
// call `swift run figma-swift` from the correct location. This requires parsing
// the output of xcodebuild for .xcodeproj projects, or parsing Package.swift
// for SPM projects.
//
// As this is a first party parser, we do this in TypeScript and call it as part
// of our code. For third party parsers, logic like this would need to be
// implemented in a script/binary which the user points Code Connect to.
async function getSwiftParserDir(cwd, xcodeprojPath, swiftPackagePath) {
    let figmaPackageDir;
    let xcodeprojFile;
    let packageSwiftFile;
    // // Check for the supported project types giving precedence top the user provided path
    if (xcodeprojPath) {
        xcodeprojFile = xcodeprojPath.replace(/\s/g, '\\ ');
    }
    else if (swiftPackagePath) {
        packageSwiftFile = path_1.default.dirname(swiftPackagePath).replace(/\s/g, '\\ ');
    }
    else {
        xcodeprojFile = (0, get_file_if_exists_1.getFileIfExists)(cwd, '*.xcodeproj').replace(/\s/g, '\\ ');
        packageSwiftFile = (0, get_file_if_exists_1.getFileIfExists)(cwd, 'Package.swift').replace(/\s/g, '\\ ');
    }
    if (!(xcodeprojFile || packageSwiftFile)) {
        (0, logging_1.exitWithError)('No supported project found. Supported project types are .xcodeproj or Package.swift. You can specify the location of your .xcodeproj file with the `xcodeprojPath` config option.');
    }
    if (xcodeprojFile) {
        // Use xcodebuild to get the build settings, so we can find where the Code
        // Connect Swift package is installed
        const result = (0, child_process_1.spawnSync)('xcodebuild', ['-project', xcodeprojFile, '-showBuildSettings'], {
            cwd,
            encoding: 'utf-8',
        });
        if (result.error) {
            throw result.error;
        }
        const buildSettings = result.stdout;
        // Extract the source and version of the Code Connect Swift package from the
        // xcodebuild output, which can be in any of the following formats depending
        // on how it is installed:
        // - Figma: https://github.com/figma/code-connect @ 0.1.2
        // - Figma: /path/to/code-connect @ local
        // - Figma: /path/to/code-connect
        const figmaPackageMatch = buildSettings.match(/\s+Figma: ([^\s]*)(?: @ (.*))?/);
        if (!figmaPackageMatch) {
            (0, logging_1.exitWithError)('Code Connect Swift package not found. Please add a dependency to the Code Connect package at https://github.com/figma/code-connect to your project.');
        }
        // Find the package's location on disk, to compile and run the parser binary from
        const [_, figmaPackageSource, figmaPackageVersion] = figmaPackageMatch;
        // The package version is `local` if installed via the "Add package" dialog,
        // or undefined if installed via the "Frameworks" section directly (which we
        // do for our test project, because the dialog won't allow ancestors to be
        // added)
        const isLocalFigmaPackage = figmaPackageVersion === 'local' || figmaPackageVersion === undefined;
        if (isLocalFigmaPackage) {
            // If the version is 'local', the package is installed from a local checkout,
            // and the path on disk is the source output by xcodebuild.
            figmaPackageDir = figmaPackageSource;
        }
        else {
            // Otherwise, the package will be installed to
            // <DerviedData>/SourcePackages/checkouts/code-connect. We find the
            // DerivedData location from the BUILD_DIR (which points to
            // <DerivedData>/Build/Products).
            const buildDir = buildSettings.match(/\s+BUILD_DIR = (.*)/);
            if (!buildDir) {
                (0, logging_1.exitWithError)('BUILD_DIR not found in xcodebuild output');
            }
            figmaPackageDir = `${buildDir[1]}/../../SourcePackages/checkouts/code-connect`;
        }
    }
    else if (packageSwiftFile) {
        const swiftPackageDir = swiftPackagePath ? path_1.default.dirname(swiftPackagePath) : undefined;
        const packageDir = swiftPackageDir || cwd;
        // Use the Swift command to determine if the package is installed locally or from Git
        try {
            const result = (0, child_process_1.spawnSync)('swift', ['package', '--package-path', packageDir, 'describe', '--type', 'json'], {
                cwd,
                encoding: 'utf-8',
            });
            if (result.error) {
                throw result.error;
            }
            const packageInfo = JSON.parse(result.stdout);
            const codeConnectPackage = packageInfo.dependencies.find((p) => p.identity === 'code-connect') ??
                // Our local directory is called figmadoc, so this is what swift outputs as the identity
                packageInfo.dependencies.find((p) => p.identity === 'figmadoc');
            if (!codeConnectPackage) {
                (0, logging_1.exitWithError)('Code Connect Swift package not found in Package.swift. Please add a dependency to https://github.com/figma/code-connect to your Package.swift file.');
            }
            // We can run directly from the directory of the package swift file
            figmaPackageDir = packageDir;
        }
        catch (e) {
            (0, logging_1.exitWithError)(`Error calling Swift command: ${e}`);
        }
    }
    if (!figmaPackageDir) {
        (0, logging_1.exitWithError)('Figma package could not be found');
    }
    logging_1.logger.info(`Found Code Connect Swift package at ${figmaPackageDir}, building parser binary. This may take a few minutes if this is the first time you've run Code Connect.`);
    return figmaPackageDir;
}
//# sourceMappingURL=get_swift_parser_dir.js.map