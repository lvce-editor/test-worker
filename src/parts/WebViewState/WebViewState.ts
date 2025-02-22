const webViews = Object.create(null)

export const set = (id: string, webView: any): void => {
  webViews[id] = webView
}

export const get = (id: string): any => {
  return webViews[id]
}
