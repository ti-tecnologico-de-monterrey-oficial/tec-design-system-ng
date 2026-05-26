"use strict";
var A = Object.defineProperty;
var r = Object.getOwnPropertyDescriptor;
var I = Object.getOwnPropertyNames;
var D = Object.prototype.hasOwnProperty;
var o = (S, R) => {
  for (var T in R)
    A(S, T, { get: R[T], enumerable: !0 });
}, C = (S, R, T, N) => {
  if (R && typeof R == "object" || typeof R == "function")
    for (let _ of I(R))
      !D.call(S, _) && _ !== T && A(S, _, { get: () => R[_], enumerable: !(N = r(R, _)) || N.enumerable });
  return S;
};
var P = (S) => C(A({}, "__esModule", { value: !0 }), S);

// src/core-events/index.ts
var WE = {};
o(WE, {
  ARGTYPES_INFO_REQUEST: () => UE,
  ARGTYPES_INFO_RESPONSE: () => HE,
  CHANNEL_CREATED: () => a,
  CHANNEL_WS_DISCONNECT: () => Y,
  CONFIG_ERROR: () => U,
  CREATE_NEW_STORYFILE_REQUEST: () => H,
  CREATE_NEW_STORYFILE_RESPONSE: () => W,
  CURRENT_STORY_WAS_SET: () => G,
  DOCS_PREPARED: () => d,
  DOCS_RENDERED: () => i,
  FILE_COMPONENT_SEARCH_REQUEST: () => t,
  FILE_COMPONENT_SEARCH_RESPONSE: () => p,
  FORCE_REMOUNT: () => F,
  FORCE_RE_RENDER: () => l,
  GLOBALS_UPDATED: () => y,
  NAVIGATE_URL: () => e,
  PLAY_FUNCTION_THREW_EXCEPTION: () => c,
  PRELOAD_ENTRIES: () => f,
  PREVIEW_BUILDER_PROGRESS: () => u,
  PREVIEW_INITIALIZED: () => g,
  PREVIEW_KEYDOWN: () => s,
  REGISTER_SUBSCRIPTION: () => x,
  REQUEST_WHATS_NEW_DATA: () => DE,
  RESET_STORY_ARGS: () => V,
  RESULT_WHATS_NEW_DATA: () => oE,
  SAVE_STORY_REQUEST: () => YE,
  SAVE_STORY_RESPONSE: () => aE,
  SELECT_STORY: () => m,
  SET_CONFIG: () => M,
  SET_CURRENT_STORY: () => Q,
  SET_FILTER: () => w,
  SET_GLOBALS: () => B,
  SET_INDEX: () => X,
  SET_STORIES: () => b,
  SET_WHATS_NEW_CACHE: () => CE,
  SHARED_STATE_CHANGED: () => q,
  SHARED_STATE_SET: () => K,
  STORIES_COLLAPSE_ALL: () => Z,
  STORIES_EXPAND_ALL: () => z,
  STORY_ARGS_UPDATED: () => j,
  STORY_CHANGED: () => k,
  STORY_ERRORED: () => J,
  STORY_FINISHED: () => SE,
  STORY_HOT_UPDATED: () => OE,
  STORY_INDEX_INVALIDATED: () => $,
  STORY_MISSING: () => n,
  STORY_PREPARED: () => v,
  STORY_RENDERED: () => RE,
  STORY_RENDER_PHASE_CHANGED: () => EE,
  STORY_SPECIFIED: () => _E,
  STORY_THREW_EXCEPTION: () => TE,
  STORY_UNCHANGED: () => AE,
  TELEMETRY_ERROR: () => LE,
  TOGGLE_WHATS_NEW_NOTIFICATIONS: () => PE,
  UNHANDLED_ERRORS_WHILE_PLAYING: () => h,
  UPDATE_GLOBALS: () => NE,
  UPDATE_QUERY_PARAMS: () => rE,
  UPDATE_STORY_ARGS: () => IE,
  default: () => L
});
module.exports = P(WE);
var O = /* @__PURE__ */ ((E) => (E.CHANNEL_WS_DISCONNECT = "channelWSDisconnect", E.CHANNEL_CREATED = "channelCreated", E.CONFIG_ERROR = "co\
nfigError", E.STORY_INDEX_INVALIDATED = "storyIndexInvalidated", E.STORY_SPECIFIED = "storySpecified", E.SET_CONFIG = "setConfig", E.SET_STORIES =
"setStories", E.SET_INDEX = "setIndex", E.SET_CURRENT_STORY = "setCurrentStory", E.CURRENT_STORY_WAS_SET = "currentStoryWasSet", E.FORCE_RE_RENDER =
"forceReRender", E.FORCE_REMOUNT = "forceRemount", E.PRELOAD_ENTRIES = "preloadStories", E.STORY_PREPARED = "storyPrepared", E.DOCS_PREPARED =
"docsPrepared", E.STORY_CHANGED = "storyChanged", E.STORY_UNCHANGED = "storyUnchanged", E.STORY_RENDERED = "storyRendered", E.STORY_FINISHED =
"storyFinished", E.STORY_MISSING = "storyMissing", E.STORY_ERRORED = "storyErrored", E.STORY_THREW_EXCEPTION = "storyThrewException", E.STORY_RENDER_PHASE_CHANGED =
"storyRenderPhaseChanged", E.STORY_HOT_UPDATED = "storyHotUpdated", E.PLAY_FUNCTION_THREW_EXCEPTION = "playFunctionThrewException", E.UNHANDLED_ERRORS_WHILE_PLAYING =
"unhandledErrorsWhilePlaying", E.UPDATE_STORY_ARGS = "updateStoryArgs", E.STORY_ARGS_UPDATED = "storyArgsUpdated", E.RESET_STORY_ARGS = "res\
etStoryArgs", E.SET_FILTER = "setFilter", E.SET_GLOBALS = "setGlobals", E.UPDATE_GLOBALS = "updateGlobals", E.GLOBALS_UPDATED = "globalsUpda\
ted", E.REGISTER_SUBSCRIPTION = "registerSubscription", E.PREVIEW_INITIALIZED = "previewInitialized", E.PREVIEW_KEYDOWN = "previewKeydown", E.
PREVIEW_BUILDER_PROGRESS = "preview_builder_progress", E.SELECT_STORY = "selectStory", E.STORIES_COLLAPSE_ALL = "storiesCollapseAll", E.STORIES_EXPAND_ALL =
"storiesExpandAll", E.DOCS_RENDERED = "docsRendered", E.SHARED_STATE_CHANGED = "sharedStateChanged", E.SHARED_STATE_SET = "sharedStateSet", E.
NAVIGATE_URL = "navigateUrl", E.UPDATE_QUERY_PARAMS = "updateQueryParams", E.REQUEST_WHATS_NEW_DATA = "requestWhatsNewData", E.RESULT_WHATS_NEW_DATA =
"resultWhatsNewData", E.SET_WHATS_NEW_CACHE = "setWhatsNewCache", E.TOGGLE_WHATS_NEW_NOTIFICATIONS = "toggleWhatsNewNotifications", E.TELEMETRY_ERROR =
"telemetryError", E.FILE_COMPONENT_SEARCH_REQUEST = "fileComponentSearchRequest", E.FILE_COMPONENT_SEARCH_RESPONSE = "fileComponentSearchRes\
ponse", E.SAVE_STORY_REQUEST = "saveStoryRequest", E.SAVE_STORY_RESPONSE = "saveStoryResponse", E.ARGTYPES_INFO_REQUEST = "argtypesInfoReque\
st", E.ARGTYPES_INFO_RESPONSE = "argtypesInfoResponse", E.CREATE_NEW_STORYFILE_REQUEST = "createNewStoryfileRequest", E.CREATE_NEW_STORYFILE_RESPONSE =
"createNewStoryfileResponse", E))(O || {}), L = O, {
  CHANNEL_WS_DISCONNECT: Y,
  CHANNEL_CREATED: a,
  CONFIG_ERROR: U,
  CREATE_NEW_STORYFILE_REQUEST: H,
  CREATE_NEW_STORYFILE_RESPONSE: W,
  CURRENT_STORY_WAS_SET: G,
  DOCS_PREPARED: d,
  DOCS_RENDERED: i,
  FILE_COMPONENT_SEARCH_REQUEST: t,
  FILE_COMPONENT_SEARCH_RESPONSE: p,
  FORCE_RE_RENDER: l,
  FORCE_REMOUNT: F,
  GLOBALS_UPDATED: y,
  NAVIGATE_URL: e,
  PLAY_FUNCTION_THREW_EXCEPTION: c,
  UNHANDLED_ERRORS_WHILE_PLAYING: h,
  PRELOAD_ENTRIES: f,
  PREVIEW_INITIALIZED: g,
  PREVIEW_BUILDER_PROGRESS: u,
  PREVIEW_KEYDOWN: s,
  REGISTER_SUBSCRIPTION: x,
  RESET_STORY_ARGS: V,
  SELECT_STORY: m,
  SET_CONFIG: M,
  SET_CURRENT_STORY: Q,
  SET_FILTER: w,
  SET_GLOBALS: B,
  SET_INDEX: X,
  SET_STORIES: b,
  SHARED_STATE_CHANGED: q,
  SHARED_STATE_SET: K,
  STORIES_COLLAPSE_ALL: Z,
  STORIES_EXPAND_ALL: z,
  STORY_ARGS_UPDATED: j,
  STORY_CHANGED: k,
  STORY_ERRORED: J,
  STORY_INDEX_INVALIDATED: $,
  STORY_MISSING: n,
  STORY_PREPARED: v,
  STORY_RENDER_PHASE_CHANGED: EE,
  STORY_RENDERED: RE,
  STORY_FINISHED: SE,
  STORY_SPECIFIED: _E,
  STORY_THREW_EXCEPTION: TE,
  STORY_UNCHANGED: AE,
  STORY_HOT_UPDATED: OE,
  UPDATE_GLOBALS: NE,
  UPDATE_QUERY_PARAMS: rE,
  UPDATE_STORY_ARGS: IE,
  REQUEST_WHATS_NEW_DATA: DE,
  RESULT_WHATS_NEW_DATA: oE,
  SET_WHATS_NEW_CACHE: CE,
  TOGGLE_WHATS_NEW_NOTIFICATIONS: PE,
  TELEMETRY_ERROR: LE,
  SAVE_STORY_REQUEST: YE,
  SAVE_STORY_RESPONSE: aE,
  ARGTYPES_INFO_REQUEST: UE,
  ARGTYPES_INFO_RESPONSE: HE
} = O;
