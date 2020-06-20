import { getObjectMatch } from "./getObjectMatch";
import { ParamDefCollection, QueryStringSerializer } from "./types";
import { assert } from "./assert";

export function getQueryMatch(
  query: string | undefined,
  paramDefs: ParamDefCollection<"query">,
  queryStringSerializer: QueryStringSerializer,
  arraySeparator: string
) {
  let object = {};

  if (query) {
    object = queryStringSerializer.parse(query);

    if (__DEV__) {
      assert("[QueryStringSerializer].parse", [
        assert.collectionOfType("string", "parsedQueryString", object),
      ]);
    }
  }

  return getObjectMatch({
    object,
    paramDefs,
    urlEncodeDefault: true,
    arraySeparator,
  });
}
