/**
 * UI5 Task Convert Pug -> UI5 View
 *
 * @param {object} parameters Parameters
 * @param {module:@ui5/fs.DuplexCollection} parameters.workspace DuplexCollection to read and write files
 * @param {module:@ui5/fs.AbstractReader} parameters.dependencies Reader or Collection to read dependency files
 * @param {object} parameters.taskUtil Specification Version dependent interface to a
 *                [TaskUtil]{@link module:@ui5/builder.tasks.TaskUtil} instance
 * @param {object} parameters.options Options
 * @param {string} parameters.options.projectName Project name
 * @param {string} [parameters.options.projectNamespace] Project namespace if available
 * @param {string} [parameters.options.configuration] Task configuration if given in ui5.yaml
 * @returns {Promise<undefined>} Promise resolving with <code>undefined</code> once data has been written
 */
module.exports = async function({workspace, dependencies, taskUtil, options}) {
    const pug = require('pug');
    const pugResources = await workspace.byGlob("**/*.pug");
    await Promise.all(pugResources.map(async (resource) => {
        const pugFile = await resource.getBuffer();
        const xml = pug.render(pugFile.toString(), {});
        resource.setPath(resource.getPath().replace(".pug", ".xml"));
        resource.setString(xml);
        return workspace.write(resource);
    }));
};