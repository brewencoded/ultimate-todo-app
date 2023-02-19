interface VerbMap {
    "GET": "get"
    "PATCH": "update"
    "POST": "create"
    "DELETE": "delete"
}

type RouteList<T extends string> = {
  [Property in keyof VerbMap as `${string & Property} /api/${T}`]: `packages/functions/src/handers/${VerbMap[Property]}${Capitalize<T>}.handler`
}

export function simpleRouteBuilder<T extends string> (path: T) {
  return [
    ["GET", "get"],
    ["PATCH", "update"],
    ["POST", "create"],
    ["DELETE", "delete"]
  ]
    .map(([verb, action]) => [`${verb} /api/${path}`, action])
    .reduce((accumulator, [route, action]) => ({
      ...accumulator,
      [route]: `packages/functions/src/handlers/${action}${toTitleCase(path)}.handler`
    }), {} as RouteList<T>)
}
