import { stripImageSizesFromUrl } from "~/steps/source-nodes/fetch-nodes/fetch-referenced-media-items"

const imageNodes = {
  state: {
    nodeMetaByUrl: {},
    nodeIds: [],
  },

  reducers: {
    setState(state, payload) {
      state = {
        ...state,
        ...payload,
      }

      return state
    },

    setNodeIds(_, payload) {
      return {
        nodeIds: payload,
      }
    },

    pushNodeMeta(state, { id, sourceUrl, modifiedGmt }) {
      state.nodeIds.push(id)
      const nodeUrl = stripImageSizesFromUrl(sourceUrl)
      // dont overwrite the lookup table in case we have multiple
      // sized urls for the same image
      if (!state.nodeMetaByUrl[nodeUrl]) {
        state.nodeMetaByUrl[nodeUrl] = {
          id,
          modifiedGmt,
        }
      }

      return state
    },
  },
}

export default imageNodes
