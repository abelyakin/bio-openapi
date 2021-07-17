const OpenAPISnippet = require("../utils/generate-code-samples");

const targets = ["node_request", "python_requests", "php_curl"];

const decorators = {
  oas3: {
    'add-code-samples': () => {
      return {
        DefinitionRoot: {
          leave(schema) {
            for (const path in schema.paths) {
              for (const method in schema.paths[path]) {
                  try {
                      const generatedCode = OpenAPISnippet.getEndpointSnippets(schema, path, method, targets);
                      schema.paths[path][method]["x-codeSamples"] = [];
                      for (const snippetIdx in generatedCode.snippets) {
                          const snippet = generatedCode.snippets[snippetIdx];
                          schema.paths[path][method]["x-codeSamples"][snippetIdx] = { "lang": snippet.title, "source": snippet.content };
                      }
                  } catch (err) { console.dir(err); }
              }
          }
            return schema;
          }
        },
      }
    },
  },
};

module.exports = {
  decorators,
  id: "custom"
};