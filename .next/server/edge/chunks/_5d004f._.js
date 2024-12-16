(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["chunks/_5d004f._.js", {

"[project]/node_modules/@auth/core/lib/utils/cookie.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "SessionStore": (()=>SessionStore),
    "defaultCookies": (()=>defaultCookies)
});
var __classPrivateFieldSet = this && this.__classPrivateFieldSet || function(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet = this && this.__classPrivateFieldGet || function(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _SessionStore_instances, _SessionStore_chunks, _SessionStore_option, _SessionStore_logger, _SessionStore_chunk, _SessionStore_clean;
// Uncomment to recalculate the estimated size
// of an empty session cookie
// import { serialize } from "cookie"
// console.log(
//   "Cookie estimated to be ",
//   serialize(`__Secure.authjs.session-token.0`, "", {
//     expires: new Date(),
//     httpOnly: true,
//     maxAge: Number.MAX_SAFE_INTEGER,
//     path: "/",
//     sameSite: "strict",
//     secure: true,
//     domain: "example.com",
//   }).length,
//   " bytes"
// )
const ALLOWED_COOKIE_SIZE = 4096;
// Based on commented out section above
const ESTIMATED_EMPTY_COOKIE_SIZE = 160;
const CHUNK_SIZE = ALLOWED_COOKIE_SIZE - ESTIMATED_EMPTY_COOKIE_SIZE;
function defaultCookies(useSecureCookies) {
    const cookiePrefix = useSecureCookies ? "__Secure-" : "";
    return {
        // default cookie options
        sessionToken: {
            name: `${cookiePrefix}authjs.session-token`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: useSecureCookies
            }
        },
        callbackUrl: {
            name: `${cookiePrefix}authjs.callback-url`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: useSecureCookies
            }
        },
        csrfToken: {
            // Default to __Host- for CSRF token for additional protection if using useSecureCookies
            // NB: The `__Host-` prefix is stricter than the `__Secure-` prefix.
            name: `${useSecureCookies ? "__Host-" : ""}authjs.csrf-token`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: useSecureCookies
            }
        },
        pkceCodeVerifier: {
            name: `${cookiePrefix}authjs.pkce.code_verifier`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: useSecureCookies,
                maxAge: 60 * 15
            }
        },
        state: {
            name: `${cookiePrefix}authjs.state`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: useSecureCookies,
                maxAge: 60 * 15
            }
        },
        nonce: {
            name: `${cookiePrefix}authjs.nonce`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: useSecureCookies
            }
        },
        webauthnChallenge: {
            name: `${cookiePrefix}authjs.challenge`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: useSecureCookies,
                maxAge: 60 * 15
            }
        }
    };
}
class SessionStore {
    constructor(option, cookies, logger){
        _SessionStore_instances.add(this);
        _SessionStore_chunks.set(this, {});
        _SessionStore_option.set(this, void 0);
        _SessionStore_logger.set(this, void 0);
        __classPrivateFieldSet(this, _SessionStore_logger, logger, "f");
        __classPrivateFieldSet(this, _SessionStore_option, option, "f");
        if (!cookies) return;
        const { name: sessionCookiePrefix } = option;
        for (const [name, value] of Object.entries(cookies)){
            if (!name.startsWith(sessionCookiePrefix) || !value) continue;
            __classPrivateFieldGet(this, _SessionStore_chunks, "f")[name] = value;
        }
    }
    /**
     * The JWT Session or database Session ID
     * constructed from the cookie chunks.
     */ get value() {
        // Sort the chunks by their keys before joining
        const sortedKeys = Object.keys(__classPrivateFieldGet(this, _SessionStore_chunks, "f")).sort((a, b)=>{
            const aSuffix = parseInt(a.split(".").pop() || "0");
            const bSuffix = parseInt(b.split(".").pop() || "0");
            return aSuffix - bSuffix;
        });
        // Use the sorted keys to join the chunks in the correct order
        return sortedKeys.map((key)=>__classPrivateFieldGet(this, _SessionStore_chunks, "f")[key]).join("");
    }
    /**
     * Given a cookie value, return new cookies, chunked, to fit the allowed cookie size.
     * If the cookie has changed from chunked to unchunked or vice versa,
     * it deletes the old cookies as well.
     */ chunk(value, options) {
        // Assume all cookies should be cleaned by default
        const cookies = __classPrivateFieldGet(this, _SessionStore_instances, "m", _SessionStore_clean).call(this);
        // Calculate new chunks
        const chunked = __classPrivateFieldGet(this, _SessionStore_instances, "m", _SessionStore_chunk).call(this, {
            name: __classPrivateFieldGet(this, _SessionStore_option, "f").name,
            value,
            options: {
                ...__classPrivateFieldGet(this, _SessionStore_option, "f").options,
                ...options
            }
        });
        // Update stored chunks / cookies
        for (const chunk of chunked){
            cookies[chunk.name] = chunk;
        }
        return Object.values(cookies);
    }
    /** Returns a list of cookies that should be cleaned. */ clean() {
        return Object.values(__classPrivateFieldGet(this, _SessionStore_instances, "m", _SessionStore_clean).call(this));
    }
}
_SessionStore_chunks = new WeakMap(), _SessionStore_option = new WeakMap(), _SessionStore_logger = new WeakMap(), _SessionStore_instances = new WeakSet(), _SessionStore_chunk = function _SessionStore_chunk(cookie) {
    const chunkCount = Math.ceil(cookie.value.length / CHUNK_SIZE);
    if (chunkCount === 1) {
        __classPrivateFieldGet(this, _SessionStore_chunks, "f")[cookie.name] = cookie.value;
        return [
            cookie
        ];
    }
    const cookies = [];
    for(let i = 0; i < chunkCount; i++){
        const name = `${cookie.name}.${i}`;
        const value = cookie.value.substr(i * CHUNK_SIZE, CHUNK_SIZE);
        cookies.push({
            ...cookie,
            name,
            value
        });
        __classPrivateFieldGet(this, _SessionStore_chunks, "f")[name] = value;
    }
    __classPrivateFieldGet(this, _SessionStore_logger, "f").debug("CHUNKING_SESSION_COOKIE", {
        message: `Session cookie exceeds allowed ${ALLOWED_COOKIE_SIZE} bytes.`,
        emptyCookieSize: ESTIMATED_EMPTY_COOKIE_SIZE,
        valueSize: cookie.value.length,
        chunks: cookies.map((c)=>c.value.length + ESTIMATED_EMPTY_COOKIE_SIZE)
    });
    return cookies;
}, _SessionStore_clean = function _SessionStore_clean() {
    const cleanedChunks = {};
    for(const name in __classPrivateFieldGet(this, _SessionStore_chunks, "f")){
        delete __classPrivateFieldGet(this, _SessionStore_chunks, "f")?.[name];
        cleanedChunks[name] = {
            name,
            value: "",
            options: {
                ...__classPrivateFieldGet(this, _SessionStore_option, "f").options,
                maxAge: 0
            }
        };
    }
    return cleanedChunks;
};
}}),
"[project]/node_modules/@auth/core/errors.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
/**
 * Base error class for all Auth.js errors.
 * It's optimized to be printed in the server logs in a nicely formatted way
 * via the [`logger.error`](https://authjs.dev/reference/core#logger) option.
 */ __turbopack_esm__({
    "AccessDenied": (()=>AccessDenied),
    "AccountNotLinked": (()=>AccountNotLinked),
    "AdapterError": (()=>AdapterError),
    "AuthError": (()=>AuthError),
    "CallbackRouteError": (()=>CallbackRouteError),
    "CredentialsSignin": (()=>CredentialsSignin),
    "DuplicateConditionalUI": (()=>DuplicateConditionalUI),
    "EmailSignInError": (()=>EmailSignInError),
    "ErrorPageLoop": (()=>ErrorPageLoop),
    "EventError": (()=>EventError),
    "ExperimentalFeatureNotEnabled": (()=>ExperimentalFeatureNotEnabled),
    "InvalidCallbackUrl": (()=>InvalidCallbackUrl),
    "InvalidCheck": (()=>InvalidCheck),
    "InvalidEndpoints": (()=>InvalidEndpoints),
    "InvalidProvider": (()=>InvalidProvider),
    "JWTSessionError": (()=>JWTSessionError),
    "MissingAdapter": (()=>MissingAdapter),
    "MissingAdapterMethods": (()=>MissingAdapterMethods),
    "MissingAuthorize": (()=>MissingAuthorize),
    "MissingCSRF": (()=>MissingCSRF),
    "MissingSecret": (()=>MissingSecret),
    "MissingWebAuthnAutocomplete": (()=>MissingWebAuthnAutocomplete),
    "OAuthAccountNotLinked": (()=>OAuthAccountNotLinked),
    "OAuthCallbackError": (()=>OAuthCallbackError),
    "OAuthProfileParseError": (()=>OAuthProfileParseError),
    "OAuthSignInError": (()=>OAuthSignInError),
    "SessionTokenError": (()=>SessionTokenError),
    "SignInError": (()=>SignInError),
    "SignOutError": (()=>SignOutError),
    "UnknownAction": (()=>UnknownAction),
    "UnsupportedStrategy": (()=>UnsupportedStrategy),
    "UntrustedHost": (()=>UntrustedHost),
    "Verification": (()=>Verification),
    "WebAuthnVerificationError": (()=>WebAuthnVerificationError),
    "isClientError": (()=>isClientError)
});
class AuthError extends Error {
    constructor(message, errorOptions){
        if (message instanceof Error) {
            super(undefined, {
                cause: {
                    err: message,
                    ...message.cause,
                    ...errorOptions
                }
            });
        } else if (typeof message === "string") {
            if (errorOptions instanceof Error) {
                errorOptions = {
                    err: errorOptions,
                    ...errorOptions.cause
                };
            }
            super(message, errorOptions);
        } else {
            super(undefined, message);
        }
        this.name = this.constructor.name;
        // @ts-expect-error https://github.com/microsoft/TypeScript/issues/3841
        this.type = this.constructor.type ?? "AuthError";
        // @ts-expect-error https://github.com/microsoft/TypeScript/issues/3841
        this.kind = this.constructor.kind ?? "error";
        Error.captureStackTrace?.(this, this.constructor);
        const url = `https://errors.authjs.dev#${this.type.toLowerCase()}`;
        this.message += `${this.message ? ". " : ""}Read more at ${url}`;
    }
}
class SignInError extends AuthError {
}
SignInError.kind = "signIn";
class AdapterError extends AuthError {
}
AdapterError.type = "AdapterError";
class AccessDenied extends AuthError {
}
AccessDenied.type = "AccessDenied";
class CallbackRouteError extends AuthError {
}
CallbackRouteError.type = "CallbackRouteError";
class ErrorPageLoop extends AuthError {
}
ErrorPageLoop.type = "ErrorPageLoop";
class EventError extends AuthError {
}
EventError.type = "EventError";
class InvalidCallbackUrl extends AuthError {
}
InvalidCallbackUrl.type = "InvalidCallbackUrl";
class CredentialsSignin extends SignInError {
    constructor(){
        super(...arguments);
        /**
         * The error code that is set in the `code` query parameter of the redirect URL.
         *
         *
         * ⚠ NOTE: This property is going to be included in the URL, so make sure it does not hint at sensitive errors.
         *
         * The full error is always logged on the server, if you need to debug.
         *
         * Generally, we don't recommend hinting specifically if the user had either a wrong username or password specifically,
         * try rather something like "Invalid credentials".
         */ this.code = "credentials";
    }
}
CredentialsSignin.type = "CredentialsSignin";
class InvalidEndpoints extends AuthError {
}
InvalidEndpoints.type = "InvalidEndpoints";
class InvalidCheck extends AuthError {
}
InvalidCheck.type = "InvalidCheck";
class JWTSessionError extends AuthError {
}
JWTSessionError.type = "JWTSessionError";
class MissingAdapter extends AuthError {
}
MissingAdapter.type = "MissingAdapter";
class MissingAdapterMethods extends AuthError {
}
MissingAdapterMethods.type = "MissingAdapterMethods";
class MissingAuthorize extends AuthError {
}
MissingAuthorize.type = "MissingAuthorize";
class MissingSecret extends AuthError {
}
MissingSecret.type = "MissingSecret";
class OAuthAccountNotLinked extends SignInError {
}
OAuthAccountNotLinked.type = "OAuthAccountNotLinked";
class OAuthCallbackError extends SignInError {
}
OAuthCallbackError.type = "OAuthCallbackError";
class OAuthProfileParseError extends AuthError {
}
OAuthProfileParseError.type = "OAuthProfileParseError";
class SessionTokenError extends AuthError {
}
SessionTokenError.type = "SessionTokenError";
class OAuthSignInError extends SignInError {
}
OAuthSignInError.type = "OAuthSignInError";
class EmailSignInError extends SignInError {
}
EmailSignInError.type = "EmailSignInError";
class SignOutError extends AuthError {
}
SignOutError.type = "SignOutError";
class UnknownAction extends AuthError {
}
UnknownAction.type = "UnknownAction";
class UnsupportedStrategy extends AuthError {
}
UnsupportedStrategy.type = "UnsupportedStrategy";
class InvalidProvider extends AuthError {
}
InvalidProvider.type = "InvalidProvider";
class UntrustedHost extends AuthError {
}
UntrustedHost.type = "UntrustedHost";
class Verification extends AuthError {
}
Verification.type = "Verification";
class MissingCSRF extends SignInError {
}
MissingCSRF.type = "MissingCSRF";
const clientErrors = new Set([
    "CredentialsSignin",
    "OAuthAccountNotLinked",
    "OAuthCallbackError",
    "AccessDenied",
    "Verification",
    "MissingCSRF",
    "AccountNotLinked",
    "WebAuthnVerificationError"
]);
function isClientError(error) {
    if (error instanceof AuthError) return clientErrors.has(error.type);
    return false;
}
class DuplicateConditionalUI extends AuthError {
}
DuplicateConditionalUI.type = "DuplicateConditionalUI";
class MissingWebAuthnAutocomplete extends AuthError {
}
MissingWebAuthnAutocomplete.type = "MissingWebAuthnAutocomplete";
class WebAuthnVerificationError extends AuthError {
}
WebAuthnVerificationError.type = "WebAuthnVerificationError";
class AccountNotLinked extends SignInError {
}
AccountNotLinked.type = "AccountNotLinked";
class ExperimentalFeatureNotEnabled extends AuthError {
}
ExperimentalFeatureNotEnabled.type = "ExperimentalFeatureNotEnabled";
}}),
"[project]/node_modules/@auth/core/lib/utils/assert.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "assertConfig": (()=>assertConfig)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$utils$2f$cookie$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@auth/core/lib/utils/cookie.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@auth/core/errors.js [middleware] (ecmascript)");
;
;
let warned = false;
function isValidHttpUrl(url, baseUrl) {
    try {
        return /^https?:/.test(new URL(url, url.startsWith("/") ? baseUrl : undefined).protocol);
    } catch  {
        return false;
    }
}
function isSemverString(version) {
    return /^v\d+(?:\.\d+){0,2}$/.test(version);
}
let hasCredentials = false;
let hasEmail = false;
let hasWebAuthn = false;
const emailMethods = [
    "createVerificationToken",
    "useVerificationToken",
    "getUserByEmail"
];
const sessionMethods = [
    "createUser",
    "getUser",
    "getUserByEmail",
    "getUserByAccount",
    "updateUser",
    "linkAccount",
    "createSession",
    "getSessionAndUser",
    "updateSession",
    "deleteSession"
];
const webauthnMethods = [
    "createUser",
    "getUser",
    "linkAccount",
    "getAccount",
    "getAuthenticator",
    "createAuthenticator",
    "listAuthenticatorsByUserId",
    "updateAuthenticatorCounter"
];
function assertConfig(request, options) {
    const { url } = request;
    const warnings = [];
    if (!warned && options.debug) warnings.push("debug-enabled");
    if (!options.trustHost) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["UntrustedHost"](`Host must be trusted. URL was: ${request.url}`);
    }
    if (!options.secret?.length) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["MissingSecret"]("Please define a `secret`");
    }
    const callbackUrlParam = request.query?.callbackUrl;
    if (callbackUrlParam && !isValidHttpUrl(callbackUrlParam, url.origin)) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["InvalidCallbackUrl"](`Invalid callback URL. Received: ${callbackUrlParam}`);
    }
    const { callbackUrl: defaultCallbackUrl } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$utils$2f$cookie$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["defaultCookies"])(options.useSecureCookies ?? url.protocol === "https:");
    const callbackUrlCookie = request.cookies?.[options.cookies?.callbackUrl?.name ?? defaultCallbackUrl.name];
    if (callbackUrlCookie && !isValidHttpUrl(callbackUrlCookie, url.origin)) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["InvalidCallbackUrl"](`Invalid callback URL. Received: ${callbackUrlCookie}`);
    }
    // Keep track of webauthn providers that use conditional UI
    let hasConditionalUIProvider = false;
    for (const p of options.providers){
        const provider = typeof p === "function" ? p() : p;
        if ((provider.type === "oauth" || provider.type === "oidc") && !(provider.issuer ?? provider.options?.issuer)) {
            const { authorization: a, token: t, userinfo: u } = provider;
            let key;
            if (typeof a !== "string" && !a?.url) key = "authorization";
            else if (typeof t !== "string" && !t?.url) key = "token";
            else if (typeof u !== "string" && !u?.url) key = "userinfo";
            if (key) {
                return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["InvalidEndpoints"](`Provider "${provider.id}" is missing both \`issuer\` and \`${key}\` endpoint config. At least one of them is required`);
            }
        }
        if (provider.type === "credentials") hasCredentials = true;
        else if (provider.type === "email") hasEmail = true;
        else if (provider.type === "webauthn") {
            hasWebAuthn = true;
            // Validate simpleWebAuthnBrowserVersion
            if (provider.simpleWebAuthnBrowserVersion && !isSemverString(provider.simpleWebAuthnBrowserVersion)) {
                return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["AuthError"](`Invalid provider config for "${provider.id}": simpleWebAuthnBrowserVersion "${provider.simpleWebAuthnBrowserVersion}" must be a valid semver string.`);
            }
            if (provider.enableConditionalUI) {
                // Make sure only one webauthn provider has "enableConditionalUI" set to true
                if (hasConditionalUIProvider) {
                    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["DuplicateConditionalUI"](`Multiple webauthn providers have 'enableConditionalUI' set to True. Only one provider can have this option enabled at a time`);
                }
                hasConditionalUIProvider = true;
                // Make sure at least one formField has "webauthn" in its autocomplete param
                const hasWebauthnFormField = Object.values(provider.formFields).some((f)=>f.autocomplete && f.autocomplete.toString().indexOf("webauthn") > -1);
                if (!hasWebauthnFormField) {
                    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["MissingWebAuthnAutocomplete"](`Provider "${provider.id}" has 'enableConditionalUI' set to True, but none of its formFields have 'webauthn' in their autocomplete param`);
                }
            }
        }
    }
    if (hasCredentials) {
        const dbStrategy = options.session?.strategy === "database";
        const onlyCredentials = !options.providers.some((p)=>(typeof p === "function" ? p() : p).type !== "credentials");
        if (dbStrategy && onlyCredentials) {
            return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["UnsupportedStrategy"]("Signing in with credentials only supported if JWT strategy is enabled");
        }
        const credentialsNoAuthorize = options.providers.some((p)=>{
            const provider = typeof p === "function" ? p() : p;
            return provider.type === "credentials" && !provider.authorize;
        });
        if (credentialsNoAuthorize) {
            return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["MissingAuthorize"]("Must define an authorize() handler to use credentials authentication provider");
        }
    }
    const { adapter, session } = options;
    const requiredMethods = [];
    if (hasEmail || session?.strategy === "database" || !session?.strategy && adapter) {
        if (hasEmail) {
            if (!adapter) return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["MissingAdapter"]("Email login requires an adapter");
            requiredMethods.push(...emailMethods);
        } else {
            if (!adapter) return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["MissingAdapter"]("Database session requires an adapter");
            requiredMethods.push(...sessionMethods);
        }
    }
    if (hasWebAuthn) {
        // Log experimental warning
        if (options.experimental?.enableWebAuthn) {
            warnings.push("experimental-webauthn");
        } else {
            return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["ExperimentalFeatureNotEnabled"]("WebAuthn is an experimental feature. To enable it, set `experimental.enableWebAuthn` to `true` in your config");
        }
        if (!adapter) return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["MissingAdapter"]("WebAuthn requires an adapter");
        requiredMethods.push(...webauthnMethods);
    }
    if (adapter) {
        const missing = requiredMethods.filter((m)=>!(m in adapter));
        if (missing.length) {
            return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["MissingAdapterMethods"](`Required adapter methods were missing: ${missing.join(", ")}`);
        }
    }
    if (!warned) warned = true;
    return warnings;
}
}}),
"[project]/node_modules/cookie/index.js [middleware] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require } = __turbopack_context__;
{
/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */ 'use strict';
/**
 * Module exports.
 * @public
 */ exports.parse = parse;
exports.serialize = serialize;
/**
 * Module variables.
 * @private
 */ var __toString = Object.prototype.toString;
/**
 * RegExp to match cookie-name in RFC 6265 sec 4.1.1
 * This refers out to the obsoleted definition of token in RFC 2616 sec 2.2
 * which has been replaced by the token definition in RFC 7230 appendix B.
 *
 * cookie-name       = token
 * token             = 1*tchar
 * tchar             = "!" / "#" / "$" / "%" / "&" / "'" /
 *                     "*" / "+" / "-" / "." / "^" / "_" /
 *                     "`" / "|" / "~" / DIGIT / ALPHA
 */ var cookieNameRegExp = /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/;
/**
 * RegExp to match cookie-value in RFC 6265 sec 4.1.1
 *
 * cookie-value      = *cookie-octet / ( DQUOTE *cookie-octet DQUOTE )
 * cookie-octet      = %x21 / %x23-2B / %x2D-3A / %x3C-5B / %x5D-7E
 *                     ; US-ASCII characters excluding CTLs,
 *                     ; whitespace DQUOTE, comma, semicolon,
 *                     ; and backslash
 */ var cookieValueRegExp = /^("?)[\u0021\u0023-\u002B\u002D-\u003A\u003C-\u005B\u005D-\u007E]*\1$/;
/**
 * RegExp to match domain-value in RFC 6265 sec 4.1.1
 *
 * domain-value      = <subdomain>
 *                     ; defined in [RFC1034], Section 3.5, as
 *                     ; enhanced by [RFC1123], Section 2.1
 * <subdomain>       = <label> | <subdomain> "." <label>
 * <label>           = <let-dig> [ [ <ldh-str> ] <let-dig> ]
 *                     Labels must be 63 characters or less.
 *                     'let-dig' not 'letter' in the first char, per RFC1123
 * <ldh-str>         = <let-dig-hyp> | <let-dig-hyp> <ldh-str>
 * <let-dig-hyp>     = <let-dig> | "-"
 * <let-dig>         = <letter> | <digit>
 * <letter>          = any one of the 52 alphabetic characters A through Z in
 *                     upper case and a through z in lower case
 * <digit>           = any one of the ten digits 0 through 9
 *
 * Keep support for leading dot: https://github.com/jshttp/cookie/issues/173
 *
 * > (Note that a leading %x2E ("."), if present, is ignored even though that
 * character is not permitted, but a trailing %x2E ("."), if present, will
 * cause the user agent to ignore the attribute.)
 */ var domainValueRegExp = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i;
/**
 * RegExp to match path-value in RFC 6265 sec 4.1.1
 *
 * path-value        = <any CHAR except CTLs or ";">
 * CHAR              = %x01-7F
 *                     ; defined in RFC 5234 appendix B.1
 */ var pathValueRegExp = /^[\u0020-\u003A\u003D-\u007E]*$/;
/**
 * Parse a cookie header.
 *
 * Parse the given cookie header string into an object
 * The object has the various cookies as keys(names) => values
 *
 * @param {string} str
 * @param {object} [opt]
 * @return {object}
 * @public
 */ function parse(str, opt) {
    if (typeof str !== 'string') {
        throw new TypeError('argument str must be a string');
    }
    var obj = {};
    var len = str.length;
    // RFC 6265 sec 4.1.1, RFC 2616 2.2 defines a cookie name consists of one char minimum, plus '='.
    if (len < 2) return obj;
    var dec = opt && opt.decode || decode;
    var index = 0;
    var eqIdx = 0;
    var endIdx = 0;
    do {
        eqIdx = str.indexOf('=', index);
        if (eqIdx === -1) break; // No more cookie pairs.
        endIdx = str.indexOf(';', index);
        if (endIdx === -1) {
            endIdx = len;
        } else if (eqIdx > endIdx) {
            // backtrack on prior semicolon
            index = str.lastIndexOf(';', eqIdx - 1) + 1;
            continue;
        }
        var keyStartIdx = startIndex(str, index, eqIdx);
        var keyEndIdx = endIndex(str, eqIdx, keyStartIdx);
        var key = str.slice(keyStartIdx, keyEndIdx);
        // only assign once
        if (!obj.hasOwnProperty(key)) {
            var valStartIdx = startIndex(str, eqIdx + 1, endIdx);
            var valEndIdx = endIndex(str, endIdx, valStartIdx);
            if (str.charCodeAt(valStartIdx) === 0x22 /* " */  && str.charCodeAt(valEndIdx - 1) === 0x22 /* " */ ) {
                valStartIdx++;
                valEndIdx--;
            }
            var val = str.slice(valStartIdx, valEndIdx);
            obj[key] = tryDecode(val, dec);
        }
        index = endIdx + 1;
    }while (index < len)
    return obj;
}
function startIndex(str, index, max) {
    do {
        var code = str.charCodeAt(index);
        if (code !== 0x20 /*   */  && code !== 0x09 /* \t */ ) return index;
    }while (++index < max)
    return max;
}
function endIndex(str, index, min) {
    while(index > min){
        var code = str.charCodeAt(--index);
        if (code !== 0x20 /*   */  && code !== 0x09 /* \t */ ) return index + 1;
    }
    return min;
}
/**
 * Serialize data into a cookie header.
 *
 * Serialize a name value pair into a cookie string suitable for
 * http headers. An optional options object specifies cookie parameters.
 *
 * serialize('foo', 'bar', { httpOnly: true })
 *   => "foo=bar; httpOnly"
 *
 * @param {string} name
 * @param {string} val
 * @param {object} [opt]
 * @return {string}
 * @public
 */ function serialize(name, val, opt) {
    var enc = opt && opt.encode || encodeURIComponent;
    if (typeof enc !== 'function') {
        throw new TypeError('option encode is invalid');
    }
    if (!cookieNameRegExp.test(name)) {
        throw new TypeError('argument name is invalid');
    }
    var value = enc(val);
    if (!cookieValueRegExp.test(value)) {
        throw new TypeError('argument val is invalid');
    }
    var str = name + '=' + value;
    if (!opt) return str;
    if (null != opt.maxAge) {
        var maxAge = Math.floor(opt.maxAge);
        if (!isFinite(maxAge)) {
            throw new TypeError('option maxAge is invalid');
        }
        str += '; Max-Age=' + maxAge;
    }
    if (opt.domain) {
        if (!domainValueRegExp.test(opt.domain)) {
            throw new TypeError('option domain is invalid');
        }
        str += '; Domain=' + opt.domain;
    }
    if (opt.path) {
        if (!pathValueRegExp.test(opt.path)) {
            throw new TypeError('option path is invalid');
        }
        str += '; Path=' + opt.path;
    }
    if (opt.expires) {
        var expires = opt.expires;
        if (!isDate(expires) || isNaN(expires.valueOf())) {
            throw new TypeError('option expires is invalid');
        }
        str += '; Expires=' + expires.toUTCString();
    }
    if (opt.httpOnly) {
        str += '; HttpOnly';
    }
    if (opt.secure) {
        str += '; Secure';
    }
    if (opt.partitioned) {
        str += '; Partitioned';
    }
    if (opt.priority) {
        var priority = typeof opt.priority === 'string' ? opt.priority.toLowerCase() : opt.priority;
        switch(priority){
            case 'low':
                str += '; Priority=Low';
                break;
            case 'medium':
                str += '; Priority=Medium';
                break;
            case 'high':
                str += '; Priority=High';
                break;
            default:
                throw new TypeError('option priority is invalid');
        }
    }
    if (opt.sameSite) {
        var sameSite = typeof opt.sameSite === 'string' ? opt.sameSite.toLowerCase() : opt.sameSite;
        switch(sameSite){
            case true:
                str += '; SameSite=Strict';
                break;
            case 'lax':
                str += '; SameSite=Lax';
                break;
            case 'strict':
                str += '; SameSite=Strict';
                break;
            case 'none':
                str += '; SameSite=None';
                break;
            default:
                throw new TypeError('option sameSite is invalid');
        }
    }
    return str;
}
/**
 * URL-decode string value. Optimized to skip native call when no %.
 *
 * @param {string} str
 * @returns {string}
 */ function decode(str) {
    return str.indexOf('%') !== -1 ? decodeURIComponent(str) : str;
}
/**
 * Determine if value is a Date.
 *
 * @param {*} val
 * @private
 */ function isDate(val) {
    return __toString.call(val) === '[object Date]';
}
/**
 * Try decoding a string using a decoding function.
 *
 * @param {string} str
 * @param {function} decode
 * @private
 */ function tryDecode(str, decode) {
    try {
        return decode(str);
    } catch (e) {
        return str;
    }
}
}}),
"[project]/node_modules/jose/dist/browser/util/errors.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "JOSEAlgNotAllowed": (()=>JOSEAlgNotAllowed),
    "JOSEError": (()=>JOSEError),
    "JOSENotSupported": (()=>JOSENotSupported),
    "JWEDecryptionFailed": (()=>JWEDecryptionFailed),
    "JWEInvalid": (()=>JWEInvalid),
    "JWKInvalid": (()=>JWKInvalid),
    "JWKSInvalid": (()=>JWKSInvalid),
    "JWKSMultipleMatchingKeys": (()=>JWKSMultipleMatchingKeys),
    "JWKSNoMatchingKey": (()=>JWKSNoMatchingKey),
    "JWKSTimeout": (()=>JWKSTimeout),
    "JWSInvalid": (()=>JWSInvalid),
    "JWSSignatureVerificationFailed": (()=>JWSSignatureVerificationFailed),
    "JWTClaimValidationFailed": (()=>JWTClaimValidationFailed),
    "JWTExpired": (()=>JWTExpired),
    "JWTInvalid": (()=>JWTInvalid)
});
class JOSEError extends Error {
    constructor(message, options){
        super(message, options);
        this.code = 'ERR_JOSE_GENERIC';
        this.name = this.constructor.name;
        Error.captureStackTrace?.(this, this.constructor);
    }
}
JOSEError.code = 'ERR_JOSE_GENERIC';
class JWTClaimValidationFailed extends JOSEError {
    constructor(message, payload, claim = 'unspecified', reason = 'unspecified'){
        super(message, {
            cause: {
                claim,
                reason,
                payload
            }
        });
        this.code = 'ERR_JWT_CLAIM_VALIDATION_FAILED';
        this.claim = claim;
        this.reason = reason;
        this.payload = payload;
    }
}
JWTClaimValidationFailed.code = 'ERR_JWT_CLAIM_VALIDATION_FAILED';
class JWTExpired extends JOSEError {
    constructor(message, payload, claim = 'unspecified', reason = 'unspecified'){
        super(message, {
            cause: {
                claim,
                reason,
                payload
            }
        });
        this.code = 'ERR_JWT_EXPIRED';
        this.claim = claim;
        this.reason = reason;
        this.payload = payload;
    }
}
JWTExpired.code = 'ERR_JWT_EXPIRED';
class JOSEAlgNotAllowed extends JOSEError {
    constructor(){
        super(...arguments);
        this.code = 'ERR_JOSE_ALG_NOT_ALLOWED';
    }
}
JOSEAlgNotAllowed.code = 'ERR_JOSE_ALG_NOT_ALLOWED';
class JOSENotSupported extends JOSEError {
    constructor(){
        super(...arguments);
        this.code = 'ERR_JOSE_NOT_SUPPORTED';
    }
}
JOSENotSupported.code = 'ERR_JOSE_NOT_SUPPORTED';
class JWEDecryptionFailed extends JOSEError {
    constructor(message = 'decryption operation failed', options){
        super(message, options);
        this.code = 'ERR_JWE_DECRYPTION_FAILED';
    }
}
JWEDecryptionFailed.code = 'ERR_JWE_DECRYPTION_FAILED';
class JWEInvalid extends JOSEError {
    constructor(){
        super(...arguments);
        this.code = 'ERR_JWE_INVALID';
    }
}
JWEInvalid.code = 'ERR_JWE_INVALID';
class JWSInvalid extends JOSEError {
    constructor(){
        super(...arguments);
        this.code = 'ERR_JWS_INVALID';
    }
}
JWSInvalid.code = 'ERR_JWS_INVALID';
class JWTInvalid extends JOSEError {
    constructor(){
        super(...arguments);
        this.code = 'ERR_JWT_INVALID';
    }
}
JWTInvalid.code = 'ERR_JWT_INVALID';
class JWKInvalid extends JOSEError {
    constructor(){
        super(...arguments);
        this.code = 'ERR_JWK_INVALID';
    }
}
JWKInvalid.code = 'ERR_JWK_INVALID';
class JWKSInvalid extends JOSEError {
    constructor(){
        super(...arguments);
        this.code = 'ERR_JWKS_INVALID';
    }
}
JWKSInvalid.code = 'ERR_JWKS_INVALID';
class JWKSNoMatchingKey extends JOSEError {
    constructor(message = 'no applicable key found in the JSON Web Key Set', options){
        super(message, options);
        this.code = 'ERR_JWKS_NO_MATCHING_KEY';
    }
}
JWKSNoMatchingKey.code = 'ERR_JWKS_NO_MATCHING_KEY';
class JWKSMultipleMatchingKeys extends JOSEError {
    constructor(message = 'multiple matching keys found in the JSON Web Key Set', options){
        super(message, options);
        this.code = 'ERR_JWKS_MULTIPLE_MATCHING_KEYS';
    }
}
Symbol.asyncIterator;
JWKSMultipleMatchingKeys.code = 'ERR_JWKS_MULTIPLE_MATCHING_KEYS';
class JWKSTimeout extends JOSEError {
    constructor(message = 'request timed out', options){
        super(message, options);
        this.code = 'ERR_JWKS_TIMEOUT';
    }
}
JWKSTimeout.code = 'ERR_JWKS_TIMEOUT';
class JWSSignatureVerificationFailed extends JOSEError {
    constructor(message = 'signature verification failed', options){
        super(message, options);
        this.code = 'ERR_JWS_SIGNATURE_VERIFICATION_FAILED';
    }
}
JWSSignatureVerificationFailed.code = 'ERR_JWS_SIGNATURE_VERIFICATION_FAILED';
}}),
"[project]/node_modules/jose/dist/browser/lib/is_object.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>isObject)
});
function isObjectLike(value) {
    return typeof value === 'object' && value !== null;
}
function isObject(input) {
    if (!isObjectLike(input) || Object.prototype.toString.call(input) !== '[object Object]') {
        return false;
    }
    if (Object.getPrototypeOf(input) === null) {
        return true;
    }
    let proto = input;
    while(Object.getPrototypeOf(proto) !== null){
        proto = Object.getPrototypeOf(proto);
    }
    return Object.getPrototypeOf(input) === proto;
}
}}),
"[project]/node_modules/jose/dist/browser/runtime/webcrypto.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__),
    "isCryptoKey": (()=>isCryptoKey)
});
const __TURBOPACK__default__export__ = crypto;
const isCryptoKey = (key)=>key instanceof CryptoKey;
}}),
"[project]/node_modules/jose/dist/browser/runtime/digest.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$webcrypto$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/runtime/webcrypto.js [middleware] (ecmascript)");
;
const digest = async (algorithm, data)=>{
    const subtleDigest = `SHA-${algorithm.slice(-3)}`;
    return new Uint8Array(await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$webcrypto$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"].subtle.digest(subtleDigest, data));
};
const __TURBOPACK__default__export__ = digest;
}}),
"[project]/node_modules/jose/dist/browser/lib/buffer_utils.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "concat": (()=>concat),
    "concatKdf": (()=>concatKdf),
    "decoder": (()=>decoder),
    "encoder": (()=>encoder),
    "lengthAndInput": (()=>lengthAndInput),
    "p2s": (()=>p2s),
    "uint32be": (()=>uint32be),
    "uint64be": (()=>uint64be)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$digest$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/runtime/digest.js [middleware] (ecmascript)");
;
const encoder = new TextEncoder();
const decoder = new TextDecoder();
const MAX_INT32 = 2 ** 32;
function concat(...buffers) {
    const size = buffers.reduce((acc, { length })=>acc + length, 0);
    const buf = new Uint8Array(size);
    let i = 0;
    for (const buffer of buffers){
        buf.set(buffer, i);
        i += buffer.length;
    }
    return buf;
}
function p2s(alg, p2sInput) {
    return concat(encoder.encode(alg), new Uint8Array([
        0
    ]), p2sInput);
}
function writeUInt32BE(buf, value, offset) {
    if (value < 0 || value >= MAX_INT32) {
        throw new RangeError(`value must be >= 0 and <= ${MAX_INT32 - 1}. Received ${value}`);
    }
    buf.set([
        value >>> 24,
        value >>> 16,
        value >>> 8,
        value & 0xff
    ], offset);
}
function uint64be(value) {
    const high = Math.floor(value / MAX_INT32);
    const low = value % MAX_INT32;
    const buf = new Uint8Array(8);
    writeUInt32BE(buf, high, 0);
    writeUInt32BE(buf, low, 4);
    return buf;
}
function uint32be(value) {
    const buf = new Uint8Array(4);
    writeUInt32BE(buf, value);
    return buf;
}
function lengthAndInput(input) {
    return concat(uint32be(input.length), input);
}
async function concatKdf(secret, bits, value) {
    const iterations = Math.ceil((bits >> 3) / 32);
    const res = new Uint8Array(iterations * 32);
    for(let iter = 0; iter < iterations; iter++){
        const buf = new Uint8Array(4 + secret.length + value.length);
        buf.set(uint32be(iter + 1));
        buf.set(secret, 4);
        buf.set(value, 4 + secret.length);
        res.set(await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$digest$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"])('sha256', buf), iter * 32);
    }
    return res.slice(0, bits >> 3);
}
}}),
"[project]/node_modules/jose/dist/browser/runtime/base64url.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "decode": (()=>decode),
    "decodeBase64": (()=>decodeBase64),
    "encode": (()=>encode),
    "encodeBase64": (()=>encodeBase64)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$buffer_utils$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/lib/buffer_utils.js [middleware] (ecmascript)");
;
const encodeBase64 = (input)=>{
    let unencoded = input;
    if (typeof unencoded === 'string') {
        unencoded = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$buffer_utils$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["encoder"].encode(unencoded);
    }
    const CHUNK_SIZE = 0x8000;
    const arr = [];
    for(let i = 0; i < unencoded.length; i += CHUNK_SIZE){
        arr.push(String.fromCharCode.apply(null, unencoded.subarray(i, i + CHUNK_SIZE)));
    }
    return btoa(arr.join(''));
};
const encode = (input)=>{
    return encodeBase64(input).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
};
const decodeBase64 = (encoded)=>{
    const binary = atob(encoded);
    const bytes = new Uint8Array(binary.length);
    for(let i = 0; i < binary.length; i++){
        bytes[i] = binary.charCodeAt(i);
    }
    return bytes;
};
const decode = (input)=>{
    let encoded = input;
    if (encoded instanceof Uint8Array) {
        encoded = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$buffer_utils$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["decoder"].decode(encoded);
    }
    encoded = encoded.replace(/-/g, '+').replace(/_/g, '/').replace(/\s/g, '');
    try {
        return decodeBase64(encoded);
    } catch  {
        throw new TypeError('The input to be decoded is not correctly encoded.');
    }
};
}}),
"[project]/node_modules/jose/dist/browser/jwk/thumbprint.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "calculateJwkThumbprint": (()=>calculateJwkThumbprint),
    "calculateJwkThumbprintUri": (()=>calculateJwkThumbprintUri)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/util/errors.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$is_object$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/lib/is_object.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$buffer_utils$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/lib/buffer_utils.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$base64url$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/runtime/base64url.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$digest$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/runtime/digest.js [middleware] (ecmascript)");
;
;
;
;
;
const check = (value, description)=>{
    if (typeof value !== 'string' || !value) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["JWKInvalid"](`${description} missing or invalid`);
    }
};
async function calculateJwkThumbprint(jwk, digestAlgorithm) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$is_object$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"])(jwk)) {
        throw new TypeError('JWK must be an object');
    }
    digestAlgorithm ?? (digestAlgorithm = 'sha256');
    if (digestAlgorithm !== 'sha256' && digestAlgorithm !== 'sha384' && digestAlgorithm !== 'sha512') {
        throw new TypeError('digestAlgorithm must one of "sha256", "sha384", or "sha512"');
    }
    let components;
    switch(jwk.kty){
        case 'EC':
            check(jwk.crv, '"crv" (Curve) Parameter');
            check(jwk.x, '"x" (X Coordinate) Parameter');
            check(jwk.y, '"y" (Y Coordinate) Parameter');
            components = {
                crv: jwk.crv,
                kty: jwk.kty,
                x: jwk.x,
                y: jwk.y
            };
            break;
        case 'OKP':
            check(jwk.crv, '"crv" (Subtype of Key Pair) Parameter');
            check(jwk.x, '"x" (Public Key) Parameter');
            components = {
                crv: jwk.crv,
                kty: jwk.kty,
                x: jwk.x
            };
            break;
        case 'RSA':
            check(jwk.e, '"e" (Exponent) Parameter');
            check(jwk.n, '"n" (Modulus) Parameter');
            components = {
                e: jwk.e,
                kty: jwk.kty,
                n: jwk.n
            };
            break;
        case 'oct':
            check(jwk.k, '"k" (Key Value) Parameter');
            components = {
                k: jwk.k,
                kty: jwk.kty
            };
            break;
        default:
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["JOSENotSupported"]('"kty" (Key Type) Parameter missing or unsupported');
    }
    const data = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$buffer_utils$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["encoder"].encode(JSON.stringify(components));
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$base64url$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["encode"])(await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$digest$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"])(digestAlgorithm, data));
}
async function calculateJwkThumbprintUri(jwk, digestAlgorithm) {
    digestAlgorithm ?? (digestAlgorithm = 'sha256');
    const thumbprint = await calculateJwkThumbprint(jwk, digestAlgorithm);
    return `urn:ietf:params:oauth:jwk-thumbprint:sha-${digestAlgorithm.slice(-3)}:${thumbprint}`;
}
}}),
"[project]/node_modules/jose/dist/browser/util/base64url.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "decode": (()=>decode),
    "encode": (()=>encode)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$base64url$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/runtime/base64url.js [middleware] (ecmascript)");
;
const encode = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$base64url$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__.encode;
const decode = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$base64url$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__.decode;
}}),
"[project]/node_modules/jose/dist/browser/util/base64url.js [middleware] (ecmascript) <export * as base64url>": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, t: require } = __turbopack_context__;
{
__turbopack_esm__({
    "base64url": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$base64url$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$base64url$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/util/base64url.js [middleware] (ecmascript)");
}}),
"[project]/node_modules/jose/dist/browser/lib/is_disjoint.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
const isDisjoint = (...headers)=>{
    const sources = headers.filter(Boolean);
    if (sources.length === 0 || sources.length === 1) {
        return true;
    }
    let acc;
    for (const header of sources){
        const parameters = Object.keys(header);
        if (!acc || acc.size === 0) {
            acc = new Set(parameters);
            continue;
        }
        for (const parameter of parameters){
            if (acc.has(parameter)) {
                return false;
            }
            acc.add(parameter);
        }
    }
    return true;
};
const __TURBOPACK__default__export__ = isDisjoint;
}}),
"[project]/node_modules/jose/dist/browser/lib/validate_crit.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/util/errors.js [middleware] (ecmascript)");
;
function validateCrit(Err, recognizedDefault, recognizedOption, protectedHeader, joseHeader) {
    if (joseHeader.crit !== undefined && protectedHeader?.crit === undefined) {
        throw new Err('"crit" (Critical) Header Parameter MUST be integrity protected');
    }
    if (!protectedHeader || protectedHeader.crit === undefined) {
        return new Set();
    }
    if (!Array.isArray(protectedHeader.crit) || protectedHeader.crit.length === 0 || protectedHeader.crit.some((input)=>typeof input !== 'string' || input.length === 0)) {
        throw new Err('"crit" (Critical) Header Parameter MUST be an array of non-empty strings when present');
    }
    let recognized;
    if (recognizedOption !== undefined) {
        recognized = new Map([
            ...Object.entries(recognizedOption),
            ...recognizedDefault.entries()
        ]);
    } else {
        recognized = recognizedDefault;
    }
    for (const parameter of protectedHeader.crit){
        if (!recognized.has(parameter)) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["JOSENotSupported"](`Extension Header Parameter "${parameter}" is not recognized`);
        }
        if (joseHeader[parameter] === undefined) {
            throw new Err(`Extension Header Parameter "${parameter}" is missing`);
        }
        if (recognized.get(parameter) && protectedHeader[parameter] === undefined) {
            throw new Err(`Extension Header Parameter "${parameter}" MUST be integrity protected`);
        }
    }
    return new Set(protectedHeader.crit);
}
const __TURBOPACK__default__export__ = validateCrit;
}}),
"[project]/node_modules/jose/dist/browser/lib/is_jwk.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "isJWK": (()=>isJWK),
    "isPrivateJWK": (()=>isPrivateJWK),
    "isPublicJWK": (()=>isPublicJWK),
    "isSecretJWK": (()=>isSecretJWK)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$is_object$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/lib/is_object.js [middleware] (ecmascript)");
;
function isJWK(key) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$is_object$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"])(key) && typeof key.kty === 'string';
}
function isPrivateJWK(key) {
    return key.kty !== 'oct' && typeof key.d === 'string';
}
function isPublicJWK(key) {
    return key.kty !== 'oct' && typeof key.d === 'undefined';
}
function isSecretJWK(key) {
    return isJWK(key) && key.kty === 'oct' && typeof key.k === 'string';
}
}}),
"[project]/node_modules/jose/dist/browser/runtime/is_key_like.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__),
    "types": (()=>types)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$webcrypto$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/runtime/webcrypto.js [middleware] (ecmascript)");
;
const __TURBOPACK__default__export__ = (key)=>{
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$webcrypto$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["isCryptoKey"])(key)) {
        return true;
    }
    return key?.[Symbol.toStringTag] === 'KeyObject';
};
const types = [
    'CryptoKey'
];
}}),
"[project]/node_modules/jose/dist/browser/lib/invalid_key_input.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__),
    "withAlg": (()=>withAlg)
});
function message(msg, actual, ...types) {
    types = types.filter(Boolean);
    if (types.length > 2) {
        const last = types.pop();
        msg += `one of type ${types.join(', ')}, or ${last}.`;
    } else if (types.length === 2) {
        msg += `one of type ${types[0]} or ${types[1]}.`;
    } else {
        msg += `of type ${types[0]}.`;
    }
    if (actual == null) {
        msg += ` Received ${actual}`;
    } else if (typeof actual === 'function' && actual.name) {
        msg += ` Received function ${actual.name}`;
    } else if (typeof actual === 'object' && actual != null) {
        if (actual.constructor?.name) {
            msg += ` Received an instance of ${actual.constructor.name}`;
        }
    }
    return msg;
}
const __TURBOPACK__default__export__ = (actual, ...types)=>{
    return message('Key must be ', actual, ...types);
};
function withAlg(alg, actual, ...types) {
    return message(`Key for the ${alg} algorithm must be `, actual, ...types);
}
}}),
"[project]/node_modules/jose/dist/browser/lib/check_key_type.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "checkKeyTypeWithJwk": (()=>checkKeyTypeWithJwk),
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$is_jwk$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/lib/is_jwk.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$is_key_like$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/runtime/is_key_like.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$invalid_key_input$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/lib/invalid_key_input.js [middleware] (ecmascript)");
;
;
;
const tag = (key)=>key?.[Symbol.toStringTag];
const jwkMatchesOp = (alg, key, usage)=>{
    if (key.use !== undefined && key.use !== 'sig') {
        throw new TypeError('Invalid key for this operation, when present its use must be sig');
    }
    if (key.key_ops !== undefined && key.key_ops.includes?.(usage) !== true) {
        throw new TypeError(`Invalid key for this operation, when present its key_ops must include ${usage}`);
    }
    if (key.alg !== undefined && key.alg !== alg) {
        throw new TypeError(`Invalid key for this operation, when present its alg must be ${alg}`);
    }
    return true;
};
const symmetricTypeCheck = (alg, key, usage, allowJwk)=>{
    if (key instanceof Uint8Array) return;
    if (allowJwk && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$is_jwk$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__.isJWK(key)) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$is_jwk$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__.isSecretJWK(key) && jwkMatchesOp(alg, key, usage)) return;
        throw new TypeError(`JSON Web Key for symmetric algorithms must have JWK "kty" (Key Type) equal to "oct" and the JWK "k" (Key Value) present`);
    }
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$is_key_like$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"])(key)) {
        throw new TypeError((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$invalid_key_input$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["withAlg"])(alg, key, ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$is_key_like$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["types"], 'Uint8Array', allowJwk ? 'JSON Web Key' : null));
    }
    if (key.type !== 'secret') {
        throw new TypeError(`${tag(key)} instances for symmetric algorithms must be of type "secret"`);
    }
};
const asymmetricTypeCheck = (alg, key, usage, allowJwk)=>{
    if (allowJwk && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$is_jwk$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__.isJWK(key)) {
        switch(usage){
            case 'sign':
                if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$is_jwk$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__.isPrivateJWK(key) && jwkMatchesOp(alg, key, usage)) return;
                throw new TypeError(`JSON Web Key for this operation be a private JWK`);
            case 'verify':
                if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$is_jwk$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__.isPublicJWK(key) && jwkMatchesOp(alg, key, usage)) return;
                throw new TypeError(`JSON Web Key for this operation be a public JWK`);
        }
    }
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$is_key_like$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"])(key)) {
        throw new TypeError((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$invalid_key_input$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["withAlg"])(alg, key, ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$is_key_like$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["types"], allowJwk ? 'JSON Web Key' : null));
    }
    if (key.type === 'secret') {
        throw new TypeError(`${tag(key)} instances for asymmetric algorithms must not be of type "secret"`);
    }
    if (usage === 'sign' && key.type === 'public') {
        throw new TypeError(`${tag(key)} instances for asymmetric algorithm signing must be of type "private"`);
    }
    if (usage === 'decrypt' && key.type === 'public') {
        throw new TypeError(`${tag(key)} instances for asymmetric algorithm decryption must be of type "private"`);
    }
    if (key.algorithm && usage === 'verify' && key.type === 'private') {
        throw new TypeError(`${tag(key)} instances for asymmetric algorithm verifying must be of type "public"`);
    }
    if (key.algorithm && usage === 'encrypt' && key.type === 'private') {
        throw new TypeError(`${tag(key)} instances for asymmetric algorithm encryption must be of type "public"`);
    }
};
function checkKeyType(allowJwk, alg, key, usage) {
    const symmetric = alg.startsWith('HS') || alg === 'dir' || alg.startsWith('PBES2') || /^A\d{3}(?:GCM)?KW$/.test(alg);
    if (symmetric) {
        symmetricTypeCheck(alg, key, usage, allowJwk);
    } else {
        asymmetricTypeCheck(alg, key, usage, allowJwk);
    }
}
const __TURBOPACK__default__export__ = checkKeyType.bind(undefined, false);
const checkKeyTypeWithJwk = checkKeyType.bind(undefined, true);
}}),
"[project]/node_modules/jose/dist/browser/runtime/jwk_to_key.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$webcrypto$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/runtime/webcrypto.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/util/errors.js [middleware] (ecmascript)");
;
;
function subtleMapping(jwk) {
    let algorithm;
    let keyUsages;
    switch(jwk.kty){
        case 'RSA':
            {
                switch(jwk.alg){
                    case 'PS256':
                    case 'PS384':
                    case 'PS512':
                        algorithm = {
                            name: 'RSA-PSS',
                            hash: `SHA-${jwk.alg.slice(-3)}`
                        };
                        keyUsages = jwk.d ? [
                            'sign'
                        ] : [
                            'verify'
                        ];
                        break;
                    case 'RS256':
                    case 'RS384':
                    case 'RS512':
                        algorithm = {
                            name: 'RSASSA-PKCS1-v1_5',
                            hash: `SHA-${jwk.alg.slice(-3)}`
                        };
                        keyUsages = jwk.d ? [
                            'sign'
                        ] : [
                            'verify'
                        ];
                        break;
                    case 'RSA-OAEP':
                    case 'RSA-OAEP-256':
                    case 'RSA-OAEP-384':
                    case 'RSA-OAEP-512':
                        algorithm = {
                            name: 'RSA-OAEP',
                            hash: `SHA-${parseInt(jwk.alg.slice(-3), 10) || 1}`
                        };
                        keyUsages = jwk.d ? [
                            'decrypt',
                            'unwrapKey'
                        ] : [
                            'encrypt',
                            'wrapKey'
                        ];
                        break;
                    default:
                        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["JOSENotSupported"]('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
                }
                break;
            }
        case 'EC':
            {
                switch(jwk.alg){
                    case 'ES256':
                        algorithm = {
                            name: 'ECDSA',
                            namedCurve: 'P-256'
                        };
                        keyUsages = jwk.d ? [
                            'sign'
                        ] : [
                            'verify'
                        ];
                        break;
                    case 'ES384':
                        algorithm = {
                            name: 'ECDSA',
                            namedCurve: 'P-384'
                        };
                        keyUsages = jwk.d ? [
                            'sign'
                        ] : [
                            'verify'
                        ];
                        break;
                    case 'ES512':
                        algorithm = {
                            name: 'ECDSA',
                            namedCurve: 'P-521'
                        };
                        keyUsages = jwk.d ? [
                            'sign'
                        ] : [
                            'verify'
                        ];
                        break;
                    case 'ECDH-ES':
                    case 'ECDH-ES+A128KW':
                    case 'ECDH-ES+A192KW':
                    case 'ECDH-ES+A256KW':
                        algorithm = {
                            name: 'ECDH',
                            namedCurve: jwk.crv
                        };
                        keyUsages = jwk.d ? [
                            'deriveBits'
                        ] : [];
                        break;
                    default:
                        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["JOSENotSupported"]('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
                }
                break;
            }
        case 'OKP':
            {
                switch(jwk.alg){
                    case 'EdDSA':
                        algorithm = {
                            name: jwk.crv
                        };
                        keyUsages = jwk.d ? [
                            'sign'
                        ] : [
                            'verify'
                        ];
                        break;
                    case 'ECDH-ES':
                    case 'ECDH-ES+A128KW':
                    case 'ECDH-ES+A192KW':
                    case 'ECDH-ES+A256KW':
                        algorithm = {
                            name: jwk.crv
                        };
                        keyUsages = jwk.d ? [
                            'deriveBits'
                        ] : [];
                        break;
                    default:
                        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["JOSENotSupported"]('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
                }
                break;
            }
        default:
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["JOSENotSupported"]('Invalid or unsupported JWK "kty" (Key Type) Parameter value');
    }
    return {
        algorithm,
        keyUsages
    };
}
const parse = async (jwk)=>{
    if (!jwk.alg) {
        throw new TypeError('"alg" argument is required when "jwk.alg" is not present');
    }
    const { algorithm, keyUsages } = subtleMapping(jwk);
    const rest = [
        algorithm,
        jwk.ext ?? false,
        jwk.key_ops ?? keyUsages
    ];
    const keyData = {
        ...jwk
    };
    delete keyData.alg;
    delete keyData.use;
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$webcrypto$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"].subtle.importKey('jwk', keyData, ...rest);
};
const __TURBOPACK__default__export__ = parse;
}}),
"[project]/node_modules/jose/dist/browser/runtime/normalize_key.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$base64url$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/runtime/base64url.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$jwk_to_key$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/runtime/jwk_to_key.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$is_jwk$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/lib/is_jwk.js [middleware] (ecmascript)");
;
;
;
const exportKeyValue = (k)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$base64url$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["decode"])(k);
let privCache;
let pubCache;
const isKeyObject = (key)=>{
    return key?.[Symbol.toStringTag] === 'KeyObject';
};
const importAndCache = async (cache, key, jwk, alg, freeze = false)=>{
    let cached = cache.get(key);
    if (cached?.[alg]) {
        return cached[alg];
    }
    const cryptoKey = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$jwk_to_key$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"])({
        ...jwk,
        alg
    });
    if (freeze) Object.freeze(key);
    if (!cached) {
        cache.set(key, {
            [alg]: cryptoKey
        });
    } else {
        cached[alg] = cryptoKey;
    }
    return cryptoKey;
};
const normalizePublicKey = (key, alg)=>{
    if (isKeyObject(key)) {
        let jwk = key.export({
            format: 'jwk'
        });
        delete jwk.d;
        delete jwk.dp;
        delete jwk.dq;
        delete jwk.p;
        delete jwk.q;
        delete jwk.qi;
        if (jwk.k) {
            return exportKeyValue(jwk.k);
        }
        pubCache || (pubCache = new WeakMap());
        return importAndCache(pubCache, key, jwk, alg);
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$is_jwk$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["isJWK"])(key)) {
        if (key.k) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$base64url$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["decode"])(key.k);
        pubCache || (pubCache = new WeakMap());
        const cryptoKey = importAndCache(pubCache, key, key, alg, true);
        return cryptoKey;
    }
    return key;
};
const normalizePrivateKey = (key, alg)=>{
    if (isKeyObject(key)) {
        let jwk = key.export({
            format: 'jwk'
        });
        if (jwk.k) {
            return exportKeyValue(jwk.k);
        }
        privCache || (privCache = new WeakMap());
        return importAndCache(privCache, key, jwk, alg);
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$is_jwk$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["isJWK"])(key)) {
        if (key.k) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$base64url$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["decode"])(key.k);
        privCache || (privCache = new WeakMap());
        const cryptoKey = importAndCache(privCache, key, key, alg, true);
        return cryptoKey;
    }
    return key;
};
const __TURBOPACK__default__export__ = {
    normalizePublicKey,
    normalizePrivateKey
};
}}),
"[project]/node_modules/jose/dist/browser/lib/crypto_key.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "checkEncCryptoKey": (()=>checkEncCryptoKey),
    "checkSigCryptoKey": (()=>checkSigCryptoKey)
});
function unusable(name, prop = 'algorithm.name') {
    return new TypeError(`CryptoKey does not support this operation, its ${prop} must be ${name}`);
}
function isAlgorithm(algorithm, name) {
    return algorithm.name === name;
}
function getHashLength(hash) {
    return parseInt(hash.name.slice(4), 10);
}
function getNamedCurve(alg) {
    switch(alg){
        case 'ES256':
            return 'P-256';
        case 'ES384':
            return 'P-384';
        case 'ES512':
            return 'P-521';
        default:
            throw new Error('unreachable');
    }
}
function checkUsage(key, usages) {
    if (usages.length && !usages.some((expected)=>key.usages.includes(expected))) {
        let msg = 'CryptoKey does not support this operation, its usages must include ';
        if (usages.length > 2) {
            const last = usages.pop();
            msg += `one of ${usages.join(', ')}, or ${last}.`;
        } else if (usages.length === 2) {
            msg += `one of ${usages[0]} or ${usages[1]}.`;
        } else {
            msg += `${usages[0]}.`;
        }
        throw new TypeError(msg);
    }
}
function checkSigCryptoKey(key, alg, ...usages) {
    switch(alg){
        case 'HS256':
        case 'HS384':
        case 'HS512':
            {
                if (!isAlgorithm(key.algorithm, 'HMAC')) throw unusable('HMAC');
                const expected = parseInt(alg.slice(2), 10);
                const actual = getHashLength(key.algorithm.hash);
                if (actual !== expected) throw unusable(`SHA-${expected}`, 'algorithm.hash');
                break;
            }
        case 'RS256':
        case 'RS384':
        case 'RS512':
            {
                if (!isAlgorithm(key.algorithm, 'RSASSA-PKCS1-v1_5')) throw unusable('RSASSA-PKCS1-v1_5');
                const expected = parseInt(alg.slice(2), 10);
                const actual = getHashLength(key.algorithm.hash);
                if (actual !== expected) throw unusable(`SHA-${expected}`, 'algorithm.hash');
                break;
            }
        case 'PS256':
        case 'PS384':
        case 'PS512':
            {
                if (!isAlgorithm(key.algorithm, 'RSA-PSS')) throw unusable('RSA-PSS');
                const expected = parseInt(alg.slice(2), 10);
                const actual = getHashLength(key.algorithm.hash);
                if (actual !== expected) throw unusable(`SHA-${expected}`, 'algorithm.hash');
                break;
            }
        case 'EdDSA':
            {
                if (key.algorithm.name !== 'Ed25519' && key.algorithm.name !== 'Ed448') {
                    throw unusable('Ed25519 or Ed448');
                }
                break;
            }
        case 'ES256':
        case 'ES384':
        case 'ES512':
            {
                if (!isAlgorithm(key.algorithm, 'ECDSA')) throw unusable('ECDSA');
                const expected = getNamedCurve(alg);
                const actual = key.algorithm.namedCurve;
                if (actual !== expected) throw unusable(expected, 'algorithm.namedCurve');
                break;
            }
        default:
            throw new TypeError('CryptoKey does not support this operation');
    }
    checkUsage(key, usages);
}
function checkEncCryptoKey(key, alg, ...usages) {
    switch(alg){
        case 'A128GCM':
        case 'A192GCM':
        case 'A256GCM':
            {
                if (!isAlgorithm(key.algorithm, 'AES-GCM')) throw unusable('AES-GCM');
                const expected = parseInt(alg.slice(1, 4), 10);
                const actual = key.algorithm.length;
                if (actual !== expected) throw unusable(expected, 'algorithm.length');
                break;
            }
        case 'A128KW':
        case 'A192KW':
        case 'A256KW':
            {
                if (!isAlgorithm(key.algorithm, 'AES-KW')) throw unusable('AES-KW');
                const expected = parseInt(alg.slice(1, 4), 10);
                const actual = key.algorithm.length;
                if (actual !== expected) throw unusable(expected, 'algorithm.length');
                break;
            }
        case 'ECDH':
            {
                switch(key.algorithm.name){
                    case 'ECDH':
                    case 'X25519':
                    case 'X448':
                        break;
                    default:
                        throw unusable('ECDH, X25519, or X448');
                }
                break;
            }
        case 'PBES2-HS256+A128KW':
        case 'PBES2-HS384+A192KW':
        case 'PBES2-HS512+A256KW':
            if (!isAlgorithm(key.algorithm, 'PBKDF2')) throw unusable('PBKDF2');
            break;
        case 'RSA-OAEP':
        case 'RSA-OAEP-256':
        case 'RSA-OAEP-384':
        case 'RSA-OAEP-512':
            {
                if (!isAlgorithm(key.algorithm, 'RSA-OAEP')) throw unusable('RSA-OAEP');
                const expected = parseInt(alg.slice(9), 10) || 1;
                const actual = getHashLength(key.algorithm.hash);
                if (actual !== expected) throw unusable(`SHA-${expected}`, 'algorithm.hash');
                break;
            }
        default:
            throw new TypeError('CryptoKey does not support this operation');
    }
    checkUsage(key, usages);
}
}}),
"[project]/node_modules/jose/dist/browser/runtime/ecdhes.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "deriveKey": (()=>deriveKey),
    "ecdhAllowed": (()=>ecdhAllowed),
    "generateEpk": (()=>generateEpk)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$webcrypto$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/runtime/webcrypto.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$invalid_key_input$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/lib/invalid_key_input.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$is_key_like$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/runtime/is_key_like.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$crypto_key$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/lib/crypto_key.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$buffer_utils$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/lib/buffer_utils.js [middleware] (ecmascript)");
;
;
;
;
;
async function deriveKey(publicKey, privateKey, algorithm, keyLength, apu = new Uint8Array(0), apv = new Uint8Array(0)) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$webcrypto$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["isCryptoKey"])(publicKey)) {
        throw new TypeError((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$invalid_key_input$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"])(publicKey, ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$is_key_like$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["types"]));
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$crypto_key$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["checkEncCryptoKey"])(publicKey, 'ECDH');
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$webcrypto$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["isCryptoKey"])(privateKey)) {
        throw new TypeError((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$invalid_key_input$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"])(privateKey, ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$is_key_like$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["types"]));
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$crypto_key$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["checkEncCryptoKey"])(privateKey, 'ECDH', 'deriveBits');
    const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$buffer_utils$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["concat"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$buffer_utils$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["lengthAndInput"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$buffer_utils$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["encoder"].encode(algorithm)), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$buffer_utils$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["lengthAndInput"])(apu), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$buffer_utils$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["lengthAndInput"])(apv), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$buffer_utils$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["uint32be"])(keyLength));
    let length;
    if (publicKey.algorithm.name === 'X25519') {
        length = 256;
    } else if (publicKey.algorithm.name === 'X448') {
        length = 448;
    } else {
        length = Math.ceil(parseInt(publicKey.algorithm.namedCurve.substr(-3), 10) / 8) << 3;
    }
    const sharedSecret = new Uint8Array(await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$webcrypto$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"].subtle.deriveBits({
        name: publicKey.algorithm.name,
        public: publicKey
    }, privateKey, length));
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$buffer_utils$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["concatKdf"])(sharedSecret, keyLength, value);
}
async function generateEpk(key) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$webcrypto$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["isCryptoKey"])(key)) {
        throw new TypeError((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$invalid_key_input$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"])(key, ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$is_key_like$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["types"]));
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$webcrypto$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"].subtle.generateKey(key.algorithm, true, [
        'deriveBits'
    ]);
}
function ecdhAllowed(key) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$webcrypto$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["isCryptoKey"])(key)) {
        throw new TypeError((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$invalid_key_input$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"])(key, ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$is_key_like$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["types"]));
    }
    return [
        'P-256',
        'P-384',
        'P-521'
    ].includes(key.algorithm.namedCurve) || key.algorithm.name === 'X25519' || key.algorithm.name === 'X448';
}
}}),
"[project]/node_modules/jose/dist/browser/lib/format_pem.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
const __TURBOPACK__default__export__ = (b64, descriptor)=>{
    const newlined = (b64.match(/.{1,64}/g) || []).join('\n');
    return `-----BEGIN ${descriptor}-----\n${newlined}\n-----END ${descriptor}-----`;
};
}}),
"[project]/node_modules/jose/dist/browser/runtime/asn1.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "fromPKCS8": (()=>fromPKCS8),
    "fromSPKI": (()=>fromSPKI),
    "fromX509": (()=>fromX509),
    "toPKCS8": (()=>toPKCS8),
    "toSPKI": (()=>toSPKI)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$webcrypto$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/runtime/webcrypto.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$invalid_key_input$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/lib/invalid_key_input.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$is_key_like$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/runtime/is_key_like.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$format_pem$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/lib/format_pem.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$base64url$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/runtime/base64url.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/util/errors.js [middleware] (ecmascript)");
;
;
;
;
;
;
const genericExport = async (keyType, keyFormat, key)=>{
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$webcrypto$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["isCryptoKey"])(key)) {
        throw new TypeError((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$invalid_key_input$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"])(key, ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$is_key_like$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["types"]));
    }
    if (!key.extractable) {
        throw new TypeError('CryptoKey is not extractable');
    }
    if (key.type !== keyType) {
        throw new TypeError(`key is not a ${keyType} key`);
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$format_pem$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$base64url$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["encodeBase64"])(new Uint8Array(await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$webcrypto$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"].subtle.exportKey(keyFormat, key))), `${keyType.toUpperCase()} KEY`);
};
const toSPKI = (key)=>{
    return genericExport('public', 'spki', key);
};
const toPKCS8 = (key)=>{
    return genericExport('private', 'pkcs8', key);
};
const findOid = (keyData, oid, from = 0)=>{
    if (from === 0) {
        oid.unshift(oid.length);
        oid.unshift(0x06);
    }
    const i = keyData.indexOf(oid[0], from);
    if (i === -1) return false;
    const sub = keyData.subarray(i, i + oid.length);
    if (sub.length !== oid.length) return false;
    return sub.every((value, index)=>value === oid[index]) || findOid(keyData, oid, i + 1);
};
const getNamedCurve = (keyData)=>{
    switch(true){
        case findOid(keyData, [
            0x2a,
            0x86,
            0x48,
            0xce,
            0x3d,
            0x03,
            0x01,
            0x07
        ]):
            return 'P-256';
        case findOid(keyData, [
            0x2b,
            0x81,
            0x04,
            0x00,
            0x22
        ]):
            return 'P-384';
        case findOid(keyData, [
            0x2b,
            0x81,
            0x04,
            0x00,
            0x23
        ]):
            return 'P-521';
        case findOid(keyData, [
            0x2b,
            0x65,
            0x6e
        ]):
            return 'X25519';
        case findOid(keyData, [
            0x2b,
            0x65,
            0x6f
        ]):
            return 'X448';
        case findOid(keyData, [
            0x2b,
            0x65,
            0x70
        ]):
            return 'Ed25519';
        case findOid(keyData, [
            0x2b,
            0x65,
            0x71
        ]):
            return 'Ed448';
        default:
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["JOSENotSupported"]('Invalid or unsupported EC Key Curve or OKP Key Sub Type');
    }
};
const genericImport = async (replace, keyFormat, pem, alg, options)=>{
    let algorithm;
    let keyUsages;
    const keyData = new Uint8Array(atob(pem.replace(replace, '')).split('').map((c)=>c.charCodeAt(0)));
    const isPublic = keyFormat === 'spki';
    switch(alg){
        case 'PS256':
        case 'PS384':
        case 'PS512':
            algorithm = {
                name: 'RSA-PSS',
                hash: `SHA-${alg.slice(-3)}`
            };
            keyUsages = isPublic ? [
                'verify'
            ] : [
                'sign'
            ];
            break;
        case 'RS256':
        case 'RS384':
        case 'RS512':
            algorithm = {
                name: 'RSASSA-PKCS1-v1_5',
                hash: `SHA-${alg.slice(-3)}`
            };
            keyUsages = isPublic ? [
                'verify'
            ] : [
                'sign'
            ];
            break;
        case 'RSA-OAEP':
        case 'RSA-OAEP-256':
        case 'RSA-OAEP-384':
        case 'RSA-OAEP-512':
            algorithm = {
                name: 'RSA-OAEP',
                hash: `SHA-${parseInt(alg.slice(-3), 10) || 1}`
            };
            keyUsages = isPublic ? [
                'encrypt',
                'wrapKey'
            ] : [
                'decrypt',
                'unwrapKey'
            ];
            break;
        case 'ES256':
            algorithm = {
                name: 'ECDSA',
                namedCurve: 'P-256'
            };
            keyUsages = isPublic ? [
                'verify'
            ] : [
                'sign'
            ];
            break;
        case 'ES384':
            algorithm = {
                name: 'ECDSA',
                namedCurve: 'P-384'
            };
            keyUsages = isPublic ? [
                'verify'
            ] : [
                'sign'
            ];
            break;
        case 'ES512':
            algorithm = {
                name: 'ECDSA',
                namedCurve: 'P-521'
            };
            keyUsages = isPublic ? [
                'verify'
            ] : [
                'sign'
            ];
            break;
        case 'ECDH-ES':
        case 'ECDH-ES+A128KW':
        case 'ECDH-ES+A192KW':
        case 'ECDH-ES+A256KW':
            {
                const namedCurve = getNamedCurve(keyData);
                algorithm = namedCurve.startsWith('P-') ? {
                    name: 'ECDH',
                    namedCurve
                } : {
                    name: namedCurve
                };
                keyUsages = isPublic ? [] : [
                    'deriveBits'
                ];
                break;
            }
        case 'EdDSA':
            algorithm = {
                name: getNamedCurve(keyData)
            };
            keyUsages = isPublic ? [
                'verify'
            ] : [
                'sign'
            ];
            break;
        default:
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["JOSENotSupported"]('Invalid or unsupported "alg" (Algorithm) value');
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$webcrypto$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"].subtle.importKey(keyFormat, keyData, algorithm, options?.extractable ?? false, keyUsages);
};
const fromPKCS8 = (pem, alg, options)=>{
    return genericImport(/(?:-----(?:BEGIN|END) PRIVATE KEY-----|\s)/g, 'pkcs8', pem, alg, options);
};
const fromSPKI = (pem, alg, options)=>{
    return genericImport(/(?:-----(?:BEGIN|END) PUBLIC KEY-----|\s)/g, 'spki', pem, alg, options);
};
function getElement(seq) {
    const result = [];
    let next = 0;
    while(next < seq.length){
        const nextPart = parseElement(seq.subarray(next));
        result.push(nextPart);
        next += nextPart.byteLength;
    }
    return result;
}
function parseElement(bytes) {
    let position = 0;
    let tag = bytes[0] & 0x1f;
    position++;
    if (tag === 0x1f) {
        tag = 0;
        while(bytes[position] >= 0x80){
            tag = tag * 128 + bytes[position] - 0x80;
            position++;
        }
        tag = tag * 128 + bytes[position] - 0x80;
        position++;
    }
    let length = 0;
    if (bytes[position] < 0x80) {
        length = bytes[position];
        position++;
    } else if (length === 0x80) {
        length = 0;
        while(bytes[position + length] !== 0 || bytes[position + length + 1] !== 0){
            if (length > bytes.byteLength) {
                throw new TypeError('invalid indefinite form length');
            }
            length++;
        }
        const byteLength = position + length + 2;
        return {
            byteLength,
            contents: bytes.subarray(position, position + length),
            raw: bytes.subarray(0, byteLength)
        };
    } else {
        const numberOfDigits = bytes[position] & 0x7f;
        position++;
        length = 0;
        for(let i = 0; i < numberOfDigits; i++){
            length = length * 256 + bytes[position];
            position++;
        }
    }
    const byteLength = position + length;
    return {
        byteLength,
        contents: bytes.subarray(position, byteLength),
        raw: bytes.subarray(0, byteLength)
    };
}
function spkiFromX509(buf) {
    const tbsCertificate = getElement(getElement(parseElement(buf).contents)[0].contents);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$base64url$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["encodeBase64"])(tbsCertificate[tbsCertificate[0].raw[0] === 0xa0 ? 6 : 5].raw);
}
function getSPKI(x509) {
    const pem = x509.replace(/(?:-----(?:BEGIN|END) CERTIFICATE-----|\s)/g, '');
    const raw = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$base64url$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["decodeBase64"])(pem);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$format_pem$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"])(spkiFromX509(raw), 'PUBLIC KEY');
}
const fromX509 = (pem, alg, options)=>{
    let spki;
    try {
        spki = getSPKI(pem);
    } catch (cause) {
        throw new TypeError('Failed to parse the X.509 certificate', {
            cause
        });
    }
    return fromSPKI(spki, alg, options);
};
}}),
"[project]/node_modules/jose/dist/browser/runtime/key_to_jwk.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$base64url$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/runtime/base64url.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$webcrypto$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/runtime/webcrypto.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$invalid_key_input$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/lib/invalid_key_input.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$is_key_like$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/runtime/is_key_like.js [middleware] (ecmascript)");
;
;
;
;
const keyToJWK = async (key)=>{
    if (key instanceof Uint8Array) {
        return {
            kty: 'oct',
            k: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$base64url$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["encode"])(key)
        };
    }
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$webcrypto$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["isCryptoKey"])(key)) {
        throw new TypeError((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$invalid_key_input$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"])(key, ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$is_key_like$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["types"], 'Uint8Array'));
    }
    if (!key.extractable) {
        throw new TypeError('non-extractable CryptoKey cannot be exported as a JWK');
    }
    const { ext, key_ops, alg, use, ...jwk } = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$webcrypto$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"].subtle.exportKey('jwk', key);
    return jwk;
};
const __TURBOPACK__default__export__ = keyToJWK;
}}),
"[project]/node_modules/jose/dist/browser/key/export.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "exportJWK": (()=>exportJWK),
    "exportPKCS8": (()=>exportPKCS8),
    "exportSPKI": (()=>exportSPKI)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$asn1$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/runtime/asn1.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$key_to_jwk$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/runtime/key_to_jwk.js [middleware] (ecmascript)");
;
;
;
async function exportSPKI(key) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$asn1$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["toSPKI"])(key);
}
async function exportPKCS8(key) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$asn1$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["toPKCS8"])(key);
}
async function exportJWK(key) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$key_to_jwk$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"])(key);
}
}}),
"[project]/node_modules/jose/dist/browser/runtime/random.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$webcrypto$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/runtime/webcrypto.js [middleware] (ecmascript)");
;
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$webcrypto$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"].getRandomValues.bind(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$webcrypto$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"]);
}}),
"[project]/node_modules/jose/dist/browser/lib/cek.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "bitLength": (()=>bitLength),
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$random$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/runtime/random.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/util/errors.js [middleware] (ecmascript)");
;
;
function bitLength(alg) {
    switch(alg){
        case 'A128GCM':
            return 128;
        case 'A192GCM':
            return 192;
        case 'A256GCM':
        case 'A128CBC-HS256':
            return 256;
        case 'A192CBC-HS384':
            return 384;
        case 'A256CBC-HS512':
            return 512;
        default:
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["JOSENotSupported"](`Unsupported JWE Algorithm: ${alg}`);
    }
}
const __TURBOPACK__default__export__ = (alg)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$random$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"])(new Uint8Array(bitLength(alg) >> 3));
}}),
"[project]/node_modules/jose/dist/browser/runtime/bogus.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
const bogusWebCrypto = [
    {
        hash: 'SHA-256',
        name: 'HMAC'
    },
    true,
    [
        'sign'
    ]
];
const __TURBOPACK__default__export__ = bogusWebCrypto;
}}),
"[project]/node_modules/jose/dist/browser/runtime/aeskw.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "unwrap": (()=>unwrap),
    "wrap": (()=>wrap)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$webcrypto$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/runtime/webcrypto.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$bogus$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/runtime/bogus.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$invalid_key_input$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/lib/invalid_key_input.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$is_key_like$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/runtime/is_key_like.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$crypto_key$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/lib/crypto_key.js [middleware] (ecmascript)");
;
;
;
;
;
function checkKeySize(key, alg) {
    if (key.algorithm.length !== parseInt(alg.slice(1, 4), 10)) {
        throw new TypeError(`Invalid key size for alg: ${alg}`);
    }
}
function getCryptoKey(key, alg, usage) {
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$webcrypto$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["isCryptoKey"])(key)) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$crypto_key$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["checkEncCryptoKey"])(key, alg, usage);
        return key;
    }
    if (key instanceof Uint8Array) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$webcrypto$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"].subtle.importKey('raw', key, 'AES-KW', true, [
            usage
        ]);
    }
    throw new TypeError((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$invalid_key_input$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"])(key, ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$is_key_like$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["types"], 'Uint8Array'));
}
const wrap = async (alg, key, cek)=>{
    const cryptoKey = await getCryptoKey(key, alg, 'wrapKey');
    checkKeySize(cryptoKey, alg);
    const cryptoKeyCek = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$webcrypto$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"].subtle.importKey('raw', cek, ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$bogus$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"]);
    return new Uint8Array(await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$webcrypto$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"].subtle.wrapKey('raw', cryptoKeyCek, cryptoKey, 'AES-KW'));
};
const unwrap = async (alg, key, encryptedKey)=>{
    const cryptoKey = await getCryptoKey(key, alg, 'unwrapKey');
    checkKeySize(cryptoKey, alg);
    const cryptoKeyCek = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$webcrypto$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"].subtle.unwrapKey('raw', encryptedKey, cryptoKey, 'AES-KW', ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$bogus$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"]);
    return new Uint8Array(await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$webcrypto$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"].subtle.exportKey('raw', cryptoKeyCek));
};
}}),
"[project]/node_modules/jose/dist/browser/runtime/check_key_length.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
const __TURBOPACK__default__export__ = (alg, key)=>{
    if (alg.startsWith('RS') || alg.startsWith('PS')) {
        const { modulusLength } = key.algorithm;
        if (typeof modulusLength !== 'number' || modulusLength < 2048) {
            throw new TypeError(`${alg} requires key modulusLength to be 2048 bits or larger`);
        }
    }
};
}}),
"[project]/node_modules/jose/dist/browser/runtime/subtle_rsaes.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>subtleRsaEs)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/util/errors.js [middleware] (ecmascript)");
;
function subtleRsaEs(alg) {
    switch(alg){
        case 'RSA-OAEP':
        case 'RSA-OAEP-256':
        case 'RSA-OAEP-384':
        case 'RSA-OAEP-512':
            return 'RSA-OAEP';
        default:
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["JOSENotSupported"](`alg ${alg} is not supported either by JOSE or your javascript runtime`);
    }
}
}}),
"[project]/node_modules/jose/dist/browser/runtime/rsaes.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "decrypt": (()=>decrypt),
    "encrypt": (()=>encrypt)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$webcrypto$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/runtime/webcrypto.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$invalid_key_input$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/lib/invalid_key_input.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$is_key_like$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/runtime/is_key_like.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$crypto_key$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/lib/crypto_key.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$check_key_length$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/runtime/check_key_length.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$bogus$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/runtime/bogus.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$subtle_rsaes$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/runtime/subtle_rsaes.js [middleware] (ecmascript)");
;
;
;
;
;
;
;
const encrypt = async (alg, key, cek)=>{
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$webcrypto$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["isCryptoKey"])(key)) {
        throw new TypeError((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$invalid_key_input$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"])(key, ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$is_key_like$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["types"]));
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$crypto_key$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["checkEncCryptoKey"])(key, alg, 'encrypt', 'wrapKey');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$check_key_length$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"])(alg, key);
    if (key.usages.includes('encrypt')) {
        return new Uint8Array(await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$webcrypto$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"].subtle.encrypt((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$subtle_rsaes$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"])(alg), key, cek));
    }
    if (key.usages.includes('wrapKey')) {
        const cryptoKeyCek = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$webcrypto$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"].subtle.importKey('raw', cek, ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$bogus$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"]);
        return new Uint8Array(await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$webcrypto$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"].subtle.wrapKey('raw', cryptoKeyCek, key, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$subtle_rsaes$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"])(alg)));
    }
    throw new TypeError('RSA-OAEP key "usages" must include "encrypt" or "wrapKey" for this operation');
};
const decrypt = async (alg, key, encryptedKey)=>{
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$webcrypto$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["isCryptoKey"])(key)) {
        throw new TypeError((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$invalid_key_input$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"])(key, ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$is_key_like$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["types"]));
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$crypto_key$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["checkEncCryptoKey"])(key, alg, 'decrypt', 'unwrapKey');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$check_key_length$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"])(alg, key);
    if (key.usages.includes('decrypt')) {
        return new Uint8Array(await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$webcrypto$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"].subtle.decrypt((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$subtle_rsaes$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"])(alg), key, encryptedKey));
    }
    if (key.usages.includes('unwrapKey')) {
        const cryptoKeyCek = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$webcrypto$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"].subtle.unwrapKey('raw', encryptedKey, key, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$subtle_rsaes$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"])(alg), ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$bogus$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"]);
        return new Uint8Array(await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$webcrypto$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"].subtle.exportKey('raw', cryptoKeyCek));
    }
    throw new TypeError('RSA-OAEP key "usages" must include "decrypt" or "unwrapKey" for this operation');
};
}}),
"[project]/node_modules/jose/dist/browser/lib/check_p2s.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>checkP2s)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/util/errors.js [middleware] (ecmascript)");
;
function checkP2s(p2s) {
    if (!(p2s instanceof Uint8Array) || p2s.length < 8) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["JWEInvalid"]('PBES2 Salt Input must be 8 or more octets');
    }
}
}}),
"[project]/node_modules/jose/dist/browser/runtime/pbes2kw.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "decrypt": (()=>decrypt),
    "encrypt": (()=>encrypt)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$random$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/runtime/random.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$aeskw$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/runtime/aeskw.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$base64url$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/runtime/base64url.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$webcrypto$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/runtime/webcrypto.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$invalid_key_input$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/lib/invalid_key_input.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$is_key_like$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/runtime/is_key_like.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$crypto_key$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/lib/crypto_key.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$check_p2s$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/lib/check_p2s.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$buffer_utils$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/lib/buffer_utils.js [middleware] (ecmascript)");
;
;
;
;
;
;
;
;
;
function getCryptoKey(key, alg) {
    if (key instanceof Uint8Array) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$webcrypto$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"].subtle.importKey('raw', key, 'PBKDF2', false, [
            'deriveBits'
        ]);
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$webcrypto$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["isCryptoKey"])(key)) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$crypto_key$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["checkEncCryptoKey"])(key, alg, 'deriveBits', 'deriveKey');
        return key;
    }
    throw new TypeError((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$invalid_key_input$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"])(key, ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$is_key_like$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["types"], 'Uint8Array'));
}
async function deriveKey(p2s, alg, p2c, key) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$check_p2s$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"])(p2s);
    const salt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$buffer_utils$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["p2s"])(alg, p2s);
    const keylen = parseInt(alg.slice(13, 16), 10);
    const subtleAlg = {
        hash: `SHA-${alg.slice(8, 11)}`,
        iterations: p2c,
        name: 'PBKDF2',
        salt
    };
    const wrapAlg = {
        length: keylen,
        name: 'AES-KW'
    };
    const cryptoKey = await getCryptoKey(key, alg);
    if (cryptoKey.usages.includes('deriveBits')) {
        return new Uint8Array(await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$webcrypto$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"].subtle.deriveBits(subtleAlg, cryptoKey, keylen));
    }
    if (cryptoKey.usages.includes('deriveKey')) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$webcrypto$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"].subtle.deriveKey(subtleAlg, cryptoKey, wrapAlg, false, [
            'wrapKey',
            'unwrapKey'
        ]);
    }
    throw new TypeError('PBKDF2 key "usages" must include "deriveBits" or "deriveKey"');
}
const encrypt = async (alg, key, cek, p2c = 2048, p2s = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$random$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"])(new Uint8Array(16)))=>{
    const derived = await deriveKey(p2s, alg, p2c, key);
    const encryptedKey = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$aeskw$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["wrap"])(alg.slice(-6), derived, cek);
    return {
        encryptedKey,
        p2c,
        p2s: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$base64url$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["encode"])(p2s)
    };
};
const decrypt = async (alg, key, encryptedKey, p2c, p2s)=>{
    const derived = await deriveKey(p2s, alg, p2c, key);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$aeskw$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["unwrap"])(alg.slice(-6), derived, encryptedKey);
};
}}),
"[project]/node_modules/jose/dist/browser/lib/iv.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "bitLength": (()=>bitLength),
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$random$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/runtime/random.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/util/errors.js [middleware] (ecmascript)");
;
;
function bitLength(alg) {
    switch(alg){
        case 'A128GCM':
        case 'A128GCMKW':
        case 'A192GCM':
        case 'A192GCMKW':
        case 'A256GCM':
        case 'A256GCMKW':
            return 96;
        case 'A128CBC-HS256':
        case 'A192CBC-HS384':
        case 'A256CBC-HS512':
            return 128;
        default:
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["JOSENotSupported"](`Unsupported JWE Algorithm: ${alg}`);
    }
}
const __TURBOPACK__default__export__ = (alg)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$random$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"])(new Uint8Array(bitLength(alg) >> 3));
}}),
"[project]/node_modules/jose/dist/browser/lib/check_iv_length.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$iv$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/lib/iv.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/util/errors.js [middleware] (ecmascript)");
;
;
const checkIvLength = (enc, iv)=>{
    if (iv.length << 3 !== (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$iv$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["bitLength"])(enc)) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["JWEInvalid"]('Invalid Initialization Vector length');
    }
};
const __TURBOPACK__default__export__ = checkIvLength;
}}),
"[project]/node_modules/jose/dist/browser/runtime/check_cek_length.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/util/errors.js [middleware] (ecmascript)");
;
const checkCekLength = (cek, expected)=>{
    const actual = cek.byteLength << 3;
    if (actual !== expected) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["JWEInvalid"](`Invalid Content Encryption Key length. Expected ${expected} bits, got ${actual} bits`);
    }
};
const __TURBOPACK__default__export__ = checkCekLength;
}}),
"[project]/node_modules/jose/dist/browser/runtime/encrypt.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$webcrypto$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/runtime/webcrypto.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$invalid_key_input$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/lib/invalid_key_input.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$is_key_like$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/runtime/is_key_like.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$iv$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/lib/iv.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$check_iv_length$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/lib/check_iv_length.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$check_cek_length$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/runtime/check_cek_length.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/util/errors.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$buffer_utils$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/lib/buffer_utils.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$crypto_key$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/lib/crypto_key.js [middleware] (ecmascript)");
;
;
;
;
;
;
;
;
;
async function cbcEncrypt(enc, plaintext, cek, iv, aad) {
    if (!(cek instanceof Uint8Array)) {
        throw new TypeError((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$invalid_key_input$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"])(cek, 'Uint8Array'));
    }
    const keySize = parseInt(enc.slice(1, 4), 10);
    const encKey = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$webcrypto$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"].subtle.importKey('raw', cek.subarray(keySize >> 3), 'AES-CBC', false, [
        'encrypt'
    ]);
    const macKey = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$webcrypto$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"].subtle.importKey('raw', cek.subarray(0, keySize >> 3), {
        hash: `SHA-${keySize << 1}`,
        name: 'HMAC'
    }, false, [
        'sign'
    ]);
    const ciphertext = new Uint8Array(await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$webcrypto$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"].subtle.encrypt({
        iv,
        name: 'AES-CBC'
    }, encKey, plaintext));
    const macData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$buffer_utils$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["concat"])(aad, iv, ciphertext, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$buffer_utils$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["uint64be"])(aad.length << 3));
    const tag = new Uint8Array((await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$webcrypto$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"].subtle.sign('HMAC', macKey, macData)).slice(0, keySize >> 3));
    return {
        ciphertext,
        tag,
        iv
    };
}
async function gcmEncrypt(enc, plaintext, cek, iv, aad) {
    let encKey;
    if (cek instanceof Uint8Array) {
        encKey = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$webcrypto$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"].subtle.importKey('raw', cek, 'AES-GCM', false, [
            'encrypt'
        ]);
    } else {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$crypto_key$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["checkEncCryptoKey"])(cek, enc, 'encrypt');
        encKey = cek;
    }
    const encrypted = new Uint8Array(await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$webcrypto$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"].subtle.encrypt({
        additionalData: aad,
        iv,
        name: 'AES-GCM',
        tagLength: 128
    }, encKey, plaintext));
    const tag = encrypted.slice(-16);
    const ciphertext = encrypted.slice(0, -16);
    return {
        ciphertext,
        tag,
        iv
    };
}
const encrypt = async (enc, plaintext, cek, iv, aad)=>{
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$webcrypto$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["isCryptoKey"])(cek) && !(cek instanceof Uint8Array)) {
        throw new TypeError((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$invalid_key_input$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"])(cek, ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$is_key_like$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["types"], 'Uint8Array'));
    }
    if (iv) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$check_iv_length$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"])(enc, iv);
    } else {
        iv = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$iv$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"])(enc);
    }
    switch(enc){
        case 'A128CBC-HS256':
        case 'A192CBC-HS384':
        case 'A256CBC-HS512':
            if (cek instanceof Uint8Array) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$check_cek_length$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"])(cek, parseInt(enc.slice(-3), 10));
            }
            return cbcEncrypt(enc, plaintext, cek, iv, aad);
        case 'A128GCM':
        case 'A192GCM':
        case 'A256GCM':
            if (cek instanceof Uint8Array) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$check_cek_length$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"])(cek, parseInt(enc.slice(1, 4), 10));
            }
            return gcmEncrypt(enc, plaintext, cek, iv, aad);
        default:
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["JOSENotSupported"]('Unsupported JWE Content Encryption Algorithm');
    }
};
const __TURBOPACK__default__export__ = encrypt;
}}),
"[project]/node_modules/jose/dist/browser/runtime/timing_safe_equal.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
const timingSafeEqual = (a, b)=>{
    if (!(a instanceof Uint8Array)) {
        throw new TypeError('First argument must be a buffer');
    }
    if (!(b instanceof Uint8Array)) {
        throw new TypeError('Second argument must be a buffer');
    }
    if (a.length !== b.length) {
        throw new TypeError('Input buffers must have the same length');
    }
    const len = a.length;
    let out = 0;
    let i = -1;
    while(++i < len){
        out |= a[i] ^ b[i];
    }
    return out === 0;
};
const __TURBOPACK__default__export__ = timingSafeEqual;
}}),
"[project]/node_modules/jose/dist/browser/runtime/decrypt.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$webcrypto$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/runtime/webcrypto.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$invalid_key_input$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/lib/invalid_key_input.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$is_key_like$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/runtime/is_key_like.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/util/errors.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$check_iv_length$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/lib/check_iv_length.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$check_cek_length$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/runtime/check_cek_length.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$buffer_utils$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/lib/buffer_utils.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$timing_safe_equal$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/runtime/timing_safe_equal.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$crypto_key$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/lib/crypto_key.js [middleware] (ecmascript)");
;
;
;
;
;
;
;
;
;
async function cbcDecrypt(enc, cek, ciphertext, iv, tag, aad) {
    if (!(cek instanceof Uint8Array)) {
        throw new TypeError((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$invalid_key_input$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"])(cek, 'Uint8Array'));
    }
    const keySize = parseInt(enc.slice(1, 4), 10);
    const encKey = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$webcrypto$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"].subtle.importKey('raw', cek.subarray(keySize >> 3), 'AES-CBC', false, [
        'decrypt'
    ]);
    const macKey = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$webcrypto$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"].subtle.importKey('raw', cek.subarray(0, keySize >> 3), {
        hash: `SHA-${keySize << 1}`,
        name: 'HMAC'
    }, false, [
        'sign'
    ]);
    const macData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$buffer_utils$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["concat"])(aad, iv, ciphertext, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$buffer_utils$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["uint64be"])(aad.length << 3));
    const expectedTag = new Uint8Array((await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$webcrypto$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"].subtle.sign('HMAC', macKey, macData)).slice(0, keySize >> 3));
    let macCheckPassed;
    try {
        macCheckPassed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$timing_safe_equal$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"])(tag, expectedTag);
    } catch  {}
    if (!macCheckPassed) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["JWEDecryptionFailed"]();
    }
    let plaintext;
    try {
        plaintext = new Uint8Array(await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$webcrypto$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"].subtle.decrypt({
            iv,
            name: 'AES-CBC'
        }, encKey, ciphertext));
    } catch  {}
    if (!plaintext) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["JWEDecryptionFailed"]();
    }
    return plaintext;
}
async function gcmDecrypt(enc, cek, ciphertext, iv, tag, aad) {
    let encKey;
    if (cek instanceof Uint8Array) {
        encKey = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$webcrypto$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"].subtle.importKey('raw', cek, 'AES-GCM', false, [
            'decrypt'
        ]);
    } else {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$crypto_key$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["checkEncCryptoKey"])(cek, enc, 'decrypt');
        encKey = cek;
    }
    try {
        return new Uint8Array(await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$webcrypto$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"].subtle.decrypt({
            additionalData: aad,
            iv,
            name: 'AES-GCM',
            tagLength: 128
        }, encKey, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$buffer_utils$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["concat"])(ciphertext, tag)));
    } catch  {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["JWEDecryptionFailed"]();
    }
}
const decrypt = async (enc, cek, ciphertext, iv, tag, aad)=>{
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$webcrypto$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["isCryptoKey"])(cek) && !(cek instanceof Uint8Array)) {
        throw new TypeError((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$invalid_key_input$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"])(cek, ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$is_key_like$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["types"], 'Uint8Array'));
    }
    if (!iv) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["JWEInvalid"]('JWE Initialization Vector missing');
    }
    if (!tag) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["JWEInvalid"]('JWE Authentication Tag missing');
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$check_iv_length$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"])(enc, iv);
    switch(enc){
        case 'A128CBC-HS256':
        case 'A192CBC-HS384':
        case 'A256CBC-HS512':
            if (cek instanceof Uint8Array) (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$check_cek_length$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"])(cek, parseInt(enc.slice(-3), 10));
            return cbcDecrypt(enc, cek, ciphertext, iv, tag, aad);
        case 'A128GCM':
        case 'A192GCM':
        case 'A256GCM':
            if (cek instanceof Uint8Array) (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$check_cek_length$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"])(cek, parseInt(enc.slice(1, 4), 10));
            return gcmDecrypt(enc, cek, ciphertext, iv, tag, aad);
        default:
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["JOSENotSupported"]('Unsupported JWE Content Encryption Algorithm');
    }
};
const __TURBOPACK__default__export__ = decrypt;
}}),
"[project]/node_modules/jose/dist/browser/lib/aesgcmkw.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "unwrap": (()=>unwrap),
    "wrap": (()=>wrap)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$encrypt$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/runtime/encrypt.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$base64url$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/runtime/base64url.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$decrypt$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/runtime/decrypt.js [middleware] (ecmascript)");
;
;
;
async function wrap(alg, key, cek, iv) {
    const jweAlgorithm = alg.slice(0, 7);
    const wrapped = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$encrypt$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"])(jweAlgorithm, cek, key, iv, new Uint8Array(0));
    return {
        encryptedKey: wrapped.ciphertext,
        iv: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$base64url$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["encode"])(wrapped.iv),
        tag: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$base64url$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["encode"])(wrapped.tag)
    };
}
async function unwrap(alg, key, encryptedKey, iv, tag) {
    const jweAlgorithm = alg.slice(0, 7);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$decrypt$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"])(jweAlgorithm, key, encryptedKey, iv, tag, new Uint8Array(0));
}
}}),
"[project]/node_modules/jose/dist/browser/lib/encrypt_key_management.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$check_key_type$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/lib/check_key_type.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$normalize_key$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/runtime/normalize_key.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$ecdhes$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/runtime/ecdhes.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/util/errors.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$key$2f$export$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/key/export.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$cek$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/lib/cek.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$base64url$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/runtime/base64url.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$aeskw$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/runtime/aeskw.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$rsaes$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/runtime/rsaes.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$pbes2kw$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/runtime/pbes2kw.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$aesgcmkw$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/lib/aesgcmkw.js [middleware] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
async function encryptKeyManagement(alg, enc, key, providedCek, providedParameters = {}) {
    let encryptedKey;
    let parameters;
    let cek;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$check_key_type$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"])(alg, key, 'encrypt');
    key = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$normalize_key$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"].normalizePublicKey?.(key, alg) || key;
    switch(alg){
        case 'dir':
            {
                cek = key;
                break;
            }
        case 'ECDH-ES':
        case 'ECDH-ES+A128KW':
        case 'ECDH-ES+A192KW':
        case 'ECDH-ES+A256KW':
            {
                if (!__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$ecdhes$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__.ecdhAllowed(key)) {
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["JOSENotSupported"]('ECDH with the provided key is not allowed or not supported by your javascript runtime');
                }
                const { apu, apv } = providedParameters;
                let { epk: ephemeralKey } = providedParameters;
                ephemeralKey || (ephemeralKey = (await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$ecdhes$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__.generateEpk(key)).privateKey);
                const { x, y, crv, kty } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$key$2f$export$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["exportJWK"])(ephemeralKey);
                const sharedSecret = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$ecdhes$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__.deriveKey(key, ephemeralKey, alg === 'ECDH-ES' ? enc : alg, alg === 'ECDH-ES' ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$cek$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["bitLength"])(enc) : parseInt(alg.slice(-5, -2), 10), apu, apv);
                parameters = {
                    epk: {
                        x,
                        crv,
                        kty
                    }
                };
                if (kty === 'EC') parameters.epk.y = y;
                if (apu) parameters.apu = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$base64url$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["encode"])(apu);
                if (apv) parameters.apv = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$base64url$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["encode"])(apv);
                if (alg === 'ECDH-ES') {
                    cek = sharedSecret;
                    break;
                }
                cek = providedCek || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$cek$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"])(enc);
                const kwAlg = alg.slice(-6);
                encryptedKey = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$aeskw$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["wrap"])(kwAlg, sharedSecret, cek);
                break;
            }
        case 'RSA1_5':
        case 'RSA-OAEP':
        case 'RSA-OAEP-256':
        case 'RSA-OAEP-384':
        case 'RSA-OAEP-512':
            {
                cek = providedCek || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$cek$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"])(enc);
                encryptedKey = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$rsaes$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["encrypt"])(alg, key, cek);
                break;
            }
        case 'PBES2-HS256+A128KW':
        case 'PBES2-HS384+A192KW':
        case 'PBES2-HS512+A256KW':
            {
                cek = providedCek || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$cek$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"])(enc);
                const { p2c, p2s } = providedParameters;
                ({ encryptedKey, ...parameters } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$pbes2kw$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["encrypt"])(alg, key, cek, p2c, p2s));
                break;
            }
        case 'A128KW':
        case 'A192KW':
        case 'A256KW':
            {
                cek = providedCek || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$cek$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"])(enc);
                encryptedKey = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$aeskw$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["wrap"])(alg, key, cek);
                break;
            }
        case 'A128GCMKW':
        case 'A192GCMKW':
        case 'A256GCMKW':
            {
                cek = providedCek || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$cek$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"])(enc);
                const { iv } = providedParameters;
                ({ encryptedKey, ...parameters } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$aesgcmkw$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["wrap"])(alg, key, cek, iv));
                break;
            }
        default:
            {
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["JOSENotSupported"]('Invalid or unsupported "alg" (JWE Algorithm) header value');
            }
    }
    return {
        cek,
        encryptedKey,
        parameters
    };
}
const __TURBOPACK__default__export__ = encryptKeyManagement;
}}),
"[project]/node_modules/jose/dist/browser/lib/private_symbols.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "unprotected": (()=>unprotected)
});
const unprotected = Symbol();
}}),
"[project]/node_modules/jose/dist/browser/jwe/flattened/encrypt.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "FlattenedEncrypt": (()=>FlattenedEncrypt)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/util/errors.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$is_disjoint$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/lib/is_disjoint.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$validate_crit$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/lib/validate_crit.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$encrypt_key_management$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/lib/encrypt_key_management.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$private_symbols$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/lib/private_symbols.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$buffer_utils$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/lib/buffer_utils.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$base64url$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/runtime/base64url.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$encrypt$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/runtime/encrypt.js [middleware] (ecmascript)");
;
;
;
;
;
;
;
;
class FlattenedEncrypt {
    constructor(plaintext){
        if (!(plaintext instanceof Uint8Array)) {
            throw new TypeError('plaintext must be an instance of Uint8Array');
        }
        this._plaintext = plaintext;
    }
    setKeyManagementParameters(parameters) {
        if (this._keyManagementParameters) {
            throw new TypeError('setKeyManagementParameters can only be called once');
        }
        this._keyManagementParameters = parameters;
        return this;
    }
    setProtectedHeader(protectedHeader) {
        if (this._protectedHeader) {
            throw new TypeError('setProtectedHeader can only be called once');
        }
        this._protectedHeader = protectedHeader;
        return this;
    }
    setSharedUnprotectedHeader(sharedUnprotectedHeader) {
        if (this._sharedUnprotectedHeader) {
            throw new TypeError('setSharedUnprotectedHeader can only be called once');
        }
        this._sharedUnprotectedHeader = sharedUnprotectedHeader;
        return this;
    }
    setUnprotectedHeader(unprotectedHeader) {
        if (this._unprotectedHeader) {
            throw new TypeError('setUnprotectedHeader can only be called once');
        }
        this._unprotectedHeader = unprotectedHeader;
        return this;
    }
    setAdditionalAuthenticatedData(aad) {
        this._aad = aad;
        return this;
    }
    setContentEncryptionKey(cek) {
        if (this._cek) {
            throw new TypeError('setContentEncryptionKey can only be called once');
        }
        this._cek = cek;
        return this;
    }
    setInitializationVector(iv) {
        if (this._iv) {
            throw new TypeError('setInitializationVector can only be called once');
        }
        this._iv = iv;
        return this;
    }
    async encrypt(key, options) {
        if (!this._protectedHeader && !this._unprotectedHeader && !this._sharedUnprotectedHeader) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["JWEInvalid"]('either setProtectedHeader, setUnprotectedHeader, or sharedUnprotectedHeader must be called before #encrypt()');
        }
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$is_disjoint$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"])(this._protectedHeader, this._unprotectedHeader, this._sharedUnprotectedHeader)) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["JWEInvalid"]('JWE Protected, JWE Shared Unprotected and JWE Per-Recipient Header Parameter names must be disjoint');
        }
        const joseHeader = {
            ...this._protectedHeader,
            ...this._unprotectedHeader,
            ...this._sharedUnprotectedHeader
        };
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$validate_crit$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["JWEInvalid"], new Map(), options?.crit, this._protectedHeader, joseHeader);
        if (joseHeader.zip !== undefined) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["JOSENotSupported"]('JWE "zip" (Compression Algorithm) Header Parameter is not supported.');
        }
        const { alg, enc } = joseHeader;
        if (typeof alg !== 'string' || !alg) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["JWEInvalid"]('JWE "alg" (Algorithm) Header Parameter missing or invalid');
        }
        if (typeof enc !== 'string' || !enc) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["JWEInvalid"]('JWE "enc" (Encryption Algorithm) Header Parameter missing or invalid');
        }
        let encryptedKey;
        if (this._cek && (alg === 'dir' || alg === 'ECDH-ES')) {
            throw new TypeError(`setContentEncryptionKey cannot be called with JWE "alg" (Algorithm) Header ${alg}`);
        }
        let cek;
        {
            let parameters;
            ({ cek, encryptedKey, parameters } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$encrypt_key_management$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"])(alg, enc, key, this._cek, this._keyManagementParameters));
            if (parameters) {
                if (options && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$private_symbols$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["unprotected"] in options) {
                    if (!this._unprotectedHeader) {
                        this.setUnprotectedHeader(parameters);
                    } else {
                        this._unprotectedHeader = {
                            ...this._unprotectedHeader,
                            ...parameters
                        };
                    }
                } else if (!this._protectedHeader) {
                    this.setProtectedHeader(parameters);
                } else {
                    this._protectedHeader = {
                        ...this._protectedHeader,
                        ...parameters
                    };
                }
            }
        }
        let additionalData;
        let protectedHeader;
        let aadMember;
        if (this._protectedHeader) {
            protectedHeader = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$buffer_utils$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["encoder"].encode((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$base64url$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["encode"])(JSON.stringify(this._protectedHeader)));
        } else {
            protectedHeader = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$buffer_utils$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["encoder"].encode('');
        }
        if (this._aad) {
            aadMember = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$base64url$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["encode"])(this._aad);
            additionalData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$buffer_utils$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["concat"])(protectedHeader, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$buffer_utils$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["encoder"].encode('.'), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$buffer_utils$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["encoder"].encode(aadMember));
        } else {
            additionalData = protectedHeader;
        }
        const { ciphertext, tag, iv } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$encrypt$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"])(enc, this._plaintext, cek, this._iv, additionalData);
        const jwe = {
            ciphertext: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$base64url$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["encode"])(ciphertext)
        };
        if (iv) {
            jwe.iv = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$base64url$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["encode"])(iv);
        }
        if (tag) {
            jwe.tag = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$base64url$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["encode"])(tag);
        }
        if (encryptedKey) {
            jwe.encrypted_key = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$base64url$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["encode"])(encryptedKey);
        }
        if (aadMember) {
            jwe.aad = aadMember;
        }
        if (this._protectedHeader) {
            jwe.protected = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$buffer_utils$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["decoder"].decode(protectedHeader);
        }
        if (this._sharedUnprotectedHeader) {
            jwe.unprotected = this._sharedUnprotectedHeader;
        }
        if (this._unprotectedHeader) {
            jwe.header = this._unprotectedHeader;
        }
        return jwe;
    }
}
}}),
"[project]/node_modules/jose/dist/browser/jwe/compact/encrypt.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "CompactEncrypt": (()=>CompactEncrypt)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$jwe$2f$flattened$2f$encrypt$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/jwe/flattened/encrypt.js [middleware] (ecmascript)");
;
class CompactEncrypt {
    constructor(plaintext){
        this._flattened = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$jwe$2f$flattened$2f$encrypt$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["FlattenedEncrypt"](plaintext);
    }
    setContentEncryptionKey(cek) {
        this._flattened.setContentEncryptionKey(cek);
        return this;
    }
    setInitializationVector(iv) {
        this._flattened.setInitializationVector(iv);
        return this;
    }
    setProtectedHeader(protectedHeader) {
        this._flattened.setProtectedHeader(protectedHeader);
        return this;
    }
    setKeyManagementParameters(parameters) {
        this._flattened.setKeyManagementParameters(parameters);
        return this;
    }
    async encrypt(key, options) {
        const jwe = await this._flattened.encrypt(key, options);
        return [
            jwe.protected,
            jwe.encrypted_key,
            jwe.iv,
            jwe.ciphertext,
            jwe.tag
        ].join('.');
    }
}
}}),
"[project]/node_modules/jose/dist/browser/lib/epoch.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
const __TURBOPACK__default__export__ = (date)=>Math.floor(date.getTime() / 1000);
}}),
"[project]/node_modules/jose/dist/browser/lib/secs.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
const minute = 60;
const hour = minute * 60;
const day = hour * 24;
const week = day * 7;
const year = day * 365.25;
const REGEX = /^(\+|\-)? ?(\d+|\d+\.\d+) ?(seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)(?: (ago|from now))?$/i;
const __TURBOPACK__default__export__ = (str)=>{
    const matched = REGEX.exec(str);
    if (!matched || matched[4] && matched[1]) {
        throw new TypeError('Invalid time period format');
    }
    const value = parseFloat(matched[2]);
    const unit = matched[3].toLowerCase();
    let numericDate;
    switch(unit){
        case 'sec':
        case 'secs':
        case 'second':
        case 'seconds':
        case 's':
            numericDate = Math.round(value);
            break;
        case 'minute':
        case 'minutes':
        case 'min':
        case 'mins':
        case 'm':
            numericDate = Math.round(value * minute);
            break;
        case 'hour':
        case 'hours':
        case 'hr':
        case 'hrs':
        case 'h':
            numericDate = Math.round(value * hour);
            break;
        case 'day':
        case 'days':
        case 'd':
            numericDate = Math.round(value * day);
            break;
        case 'week':
        case 'weeks':
        case 'w':
            numericDate = Math.round(value * week);
            break;
        default:
            numericDate = Math.round(value * year);
            break;
    }
    if (matched[1] === '-' || matched[4] === 'ago') {
        return -numericDate;
    }
    return numericDate;
};
}}),
"[project]/node_modules/jose/dist/browser/jwt/produce.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "ProduceJWT": (()=>ProduceJWT)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$is_object$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/lib/is_object.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$epoch$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/lib/epoch.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$secs$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/lib/secs.js [middleware] (ecmascript)");
;
;
;
function validateInput(label, input) {
    if (!Number.isFinite(input)) {
        throw new TypeError(`Invalid ${label} input`);
    }
    return input;
}
class ProduceJWT {
    constructor(payload = {}){
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$is_object$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"])(payload)) {
            throw new TypeError('JWT Claims Set MUST be an object');
        }
        this._payload = payload;
    }
    setIssuer(issuer) {
        this._payload = {
            ...this._payload,
            iss: issuer
        };
        return this;
    }
    setSubject(subject) {
        this._payload = {
            ...this._payload,
            sub: subject
        };
        return this;
    }
    setAudience(audience) {
        this._payload = {
            ...this._payload,
            aud: audience
        };
        return this;
    }
    setJti(jwtId) {
        this._payload = {
            ...this._payload,
            jti: jwtId
        };
        return this;
    }
    setNotBefore(input) {
        if (typeof input === 'number') {
            this._payload = {
                ...this._payload,
                nbf: validateInput('setNotBefore', input)
            };
        } else if (input instanceof Date) {
            this._payload = {
                ...this._payload,
                nbf: validateInput('setNotBefore', (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$epoch$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"])(input))
            };
        } else {
            this._payload = {
                ...this._payload,
                nbf: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$epoch$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"])(new Date()) + (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$secs$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"])(input)
            };
        }
        return this;
    }
    setExpirationTime(input) {
        if (typeof input === 'number') {
            this._payload = {
                ...this._payload,
                exp: validateInput('setExpirationTime', input)
            };
        } else if (input instanceof Date) {
            this._payload = {
                ...this._payload,
                exp: validateInput('setExpirationTime', (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$epoch$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"])(input))
            };
        } else {
            this._payload = {
                ...this._payload,
                exp: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$epoch$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"])(new Date()) + (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$secs$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"])(input)
            };
        }
        return this;
    }
    setIssuedAt(input) {
        if (typeof input === 'undefined') {
            this._payload = {
                ...this._payload,
                iat: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$epoch$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"])(new Date())
            };
        } else if (input instanceof Date) {
            this._payload = {
                ...this._payload,
                iat: validateInput('setIssuedAt', (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$epoch$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"])(input))
            };
        } else if (typeof input === 'string') {
            this._payload = {
                ...this._payload,
                iat: validateInput('setIssuedAt', (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$epoch$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"])(new Date()) + (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$secs$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"])(input))
            };
        } else {
            this._payload = {
                ...this._payload,
                iat: validateInput('setIssuedAt', input)
            };
        }
        return this;
    }
}
}}),
"[project]/node_modules/jose/dist/browser/jwt/encrypt.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "EncryptJWT": (()=>EncryptJWT)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$jwe$2f$compact$2f$encrypt$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/jwe/compact/encrypt.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$buffer_utils$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/lib/buffer_utils.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$jwt$2f$produce$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/jwt/produce.js [middleware] (ecmascript)");
;
;
;
class EncryptJWT extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$jwt$2f$produce$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["ProduceJWT"] {
    setProtectedHeader(protectedHeader) {
        if (this._protectedHeader) {
            throw new TypeError('setProtectedHeader can only be called once');
        }
        this._protectedHeader = protectedHeader;
        return this;
    }
    setKeyManagementParameters(parameters) {
        if (this._keyManagementParameters) {
            throw new TypeError('setKeyManagementParameters can only be called once');
        }
        this._keyManagementParameters = parameters;
        return this;
    }
    setContentEncryptionKey(cek) {
        if (this._cek) {
            throw new TypeError('setContentEncryptionKey can only be called once');
        }
        this._cek = cek;
        return this;
    }
    setInitializationVector(iv) {
        if (this._iv) {
            throw new TypeError('setInitializationVector can only be called once');
        }
        this._iv = iv;
        return this;
    }
    replicateIssuerAsHeader() {
        this._replicateIssuerAsHeader = true;
        return this;
    }
    replicateSubjectAsHeader() {
        this._replicateSubjectAsHeader = true;
        return this;
    }
    replicateAudienceAsHeader() {
        this._replicateAudienceAsHeader = true;
        return this;
    }
    async encrypt(key, options) {
        const enc = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$jwe$2f$compact$2f$encrypt$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["CompactEncrypt"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$buffer_utils$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["encoder"].encode(JSON.stringify(this._payload)));
        if (this._replicateIssuerAsHeader) {
            this._protectedHeader = {
                ...this._protectedHeader,
                iss: this._payload.iss
            };
        }
        if (this._replicateSubjectAsHeader) {
            this._protectedHeader = {
                ...this._protectedHeader,
                sub: this._payload.sub
            };
        }
        if (this._replicateAudienceAsHeader) {
            this._protectedHeader = {
                ...this._protectedHeader,
                aud: this._payload.aud
            };
        }
        enc.setProtectedHeader(this._protectedHeader);
        if (this._iv) {
            enc.setInitializationVector(this._iv);
        }
        if (this._cek) {
            enc.setContentEncryptionKey(this._cek);
        }
        if (this._keyManagementParameters) {
            enc.setKeyManagementParameters(this._keyManagementParameters);
        }
        return enc.encrypt(key, options);
    }
}
}}),
"[project]/node_modules/jose/dist/browser/lib/validate_algorithms.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
const validateAlgorithms = (option, algorithms)=>{
    if (algorithms !== undefined && (!Array.isArray(algorithms) || algorithms.some((s)=>typeof s !== 'string'))) {
        throw new TypeError(`"${option}" option must be an array of strings`);
    }
    if (!algorithms) {
        return undefined;
    }
    return new Set(algorithms);
};
const __TURBOPACK__default__export__ = validateAlgorithms;
}}),
"[project]/node_modules/jose/dist/browser/key/import.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "importJWK": (()=>importJWK),
    "importPKCS8": (()=>importPKCS8),
    "importSPKI": (()=>importSPKI),
    "importX509": (()=>importX509)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$asn1$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/runtime/asn1.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$is_object$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/lib/is_object.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$base64url$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/runtime/base64url.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/util/errors.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$jwk_to_key$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/runtime/jwk_to_key.js [middleware] (ecmascript)");
;
;
;
;
;
async function importSPKI(spki, alg, options) {
    if (typeof spki !== 'string' || spki.indexOf('-----BEGIN PUBLIC KEY-----') !== 0) {
        throw new TypeError('"spki" must be SPKI formatted string');
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$asn1$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["fromSPKI"])(spki, alg, options);
}
async function importX509(x509, alg, options) {
    if (typeof x509 !== 'string' || x509.indexOf('-----BEGIN CERTIFICATE-----') !== 0) {
        throw new TypeError('"x509" must be X.509 formatted string');
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$asn1$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["fromX509"])(x509, alg, options);
}
async function importPKCS8(pkcs8, alg, options) {
    if (typeof pkcs8 !== 'string' || pkcs8.indexOf('-----BEGIN PRIVATE KEY-----') !== 0) {
        throw new TypeError('"pkcs8" must be PKCS#8 formatted string');
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$asn1$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["fromPKCS8"])(pkcs8, alg, options);
}
async function importJWK(jwk, alg) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$is_object$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"])(jwk)) {
        throw new TypeError('JWK must be an object');
    }
    alg || (alg = jwk.alg);
    switch(jwk.kty){
        case 'oct':
            if (typeof jwk.k !== 'string' || !jwk.k) {
                throw new TypeError('missing "k" (Key Value) Parameter value');
            }
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$base64url$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["decode"])(jwk.k);
        case 'RSA':
            if (jwk.oth !== undefined) {
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["JOSENotSupported"]('RSA JWK "oth" (Other Primes Info) Parameter value is not supported');
            }
        case 'EC':
        case 'OKP':
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$jwk_to_key$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"])({
                ...jwk,
                alg
            });
        default:
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["JOSENotSupported"]('Unsupported "kty" (Key Type) Parameter value');
    }
}
}}),
"[project]/node_modules/jose/dist/browser/lib/decrypt_key_management.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$check_key_type$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/lib/check_key_type.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$normalize_key$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/runtime/normalize_key.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/util/errors.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$is_object$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/lib/is_object.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$ecdhes$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/runtime/ecdhes.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$key$2f$import$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/key/import.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$base64url$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/runtime/base64url.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$cek$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/lib/cek.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$aeskw$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/runtime/aeskw.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$rsaes$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/runtime/rsaes.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$pbes2kw$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/runtime/pbes2kw.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$aesgcmkw$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/lib/aesgcmkw.js [middleware] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
async function decryptKeyManagement(alg, key, encryptedKey, joseHeader, options) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$check_key_type$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"])(alg, key, 'decrypt');
    key = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$normalize_key$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"].normalizePrivateKey?.(key, alg) || key;
    switch(alg){
        case 'dir':
            {
                if (encryptedKey !== undefined) throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["JWEInvalid"]('Encountered unexpected JWE Encrypted Key');
                return key;
            }
        case 'ECDH-ES':
            if (encryptedKey !== undefined) throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["JWEInvalid"]('Encountered unexpected JWE Encrypted Key');
        case 'ECDH-ES+A128KW':
        case 'ECDH-ES+A192KW':
        case 'ECDH-ES+A256KW':
            {
                if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$is_object$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"])(joseHeader.epk)) throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["JWEInvalid"](`JOSE Header "epk" (Ephemeral Public Key) missing or invalid`);
                if (!__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$ecdhes$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__.ecdhAllowed(key)) throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["JOSENotSupported"]('ECDH with the provided key is not allowed or not supported by your javascript runtime');
                const epk = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$key$2f$import$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["importJWK"])(joseHeader.epk, alg);
                let partyUInfo;
                let partyVInfo;
                if (joseHeader.apu !== undefined) {
                    if (typeof joseHeader.apu !== 'string') throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["JWEInvalid"](`JOSE Header "apu" (Agreement PartyUInfo) invalid`);
                    try {
                        partyUInfo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$base64url$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["decode"])(joseHeader.apu);
                    } catch  {
                        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["JWEInvalid"]('Failed to base64url decode the apu');
                    }
                }
                if (joseHeader.apv !== undefined) {
                    if (typeof joseHeader.apv !== 'string') throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["JWEInvalid"](`JOSE Header "apv" (Agreement PartyVInfo) invalid`);
                    try {
                        partyVInfo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$base64url$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["decode"])(joseHeader.apv);
                    } catch  {
                        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["JWEInvalid"]('Failed to base64url decode the apv');
                    }
                }
                const sharedSecret = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$ecdhes$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__.deriveKey(epk, key, alg === 'ECDH-ES' ? joseHeader.enc : alg, alg === 'ECDH-ES' ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$cek$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["bitLength"])(joseHeader.enc) : parseInt(alg.slice(-5, -2), 10), partyUInfo, partyVInfo);
                if (alg === 'ECDH-ES') return sharedSecret;
                if (encryptedKey === undefined) throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["JWEInvalid"]('JWE Encrypted Key missing');
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$aeskw$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["unwrap"])(alg.slice(-6), sharedSecret, encryptedKey);
            }
        case 'RSA1_5':
        case 'RSA-OAEP':
        case 'RSA-OAEP-256':
        case 'RSA-OAEP-384':
        case 'RSA-OAEP-512':
            {
                if (encryptedKey === undefined) throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["JWEInvalid"]('JWE Encrypted Key missing');
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$rsaes$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["decrypt"])(alg, key, encryptedKey);
            }
        case 'PBES2-HS256+A128KW':
        case 'PBES2-HS384+A192KW':
        case 'PBES2-HS512+A256KW':
            {
                if (encryptedKey === undefined) throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["JWEInvalid"]('JWE Encrypted Key missing');
                if (typeof joseHeader.p2c !== 'number') throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["JWEInvalid"](`JOSE Header "p2c" (PBES2 Count) missing or invalid`);
                const p2cLimit = options?.maxPBES2Count || 10000;
                if (joseHeader.p2c > p2cLimit) throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["JWEInvalid"](`JOSE Header "p2c" (PBES2 Count) out is of acceptable bounds`);
                if (typeof joseHeader.p2s !== 'string') throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["JWEInvalid"](`JOSE Header "p2s" (PBES2 Salt) missing or invalid`);
                let p2s;
                try {
                    p2s = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$base64url$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["decode"])(joseHeader.p2s);
                } catch  {
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["JWEInvalid"]('Failed to base64url decode the p2s');
                }
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$pbes2kw$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["decrypt"])(alg, key, encryptedKey, joseHeader.p2c, p2s);
            }
        case 'A128KW':
        case 'A192KW':
        case 'A256KW':
            {
                if (encryptedKey === undefined) throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["JWEInvalid"]('JWE Encrypted Key missing');
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$aeskw$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["unwrap"])(alg, key, encryptedKey);
            }
        case 'A128GCMKW':
        case 'A192GCMKW':
        case 'A256GCMKW':
            {
                if (encryptedKey === undefined) throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["JWEInvalid"]('JWE Encrypted Key missing');
                if (typeof joseHeader.iv !== 'string') throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["JWEInvalid"](`JOSE Header "iv" (Initialization Vector) missing or invalid`);
                if (typeof joseHeader.tag !== 'string') throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["JWEInvalid"](`JOSE Header "tag" (Authentication Tag) missing or invalid`);
                let iv;
                try {
                    iv = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$base64url$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["decode"])(joseHeader.iv);
                } catch  {
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["JWEInvalid"]('Failed to base64url decode the iv');
                }
                let tag;
                try {
                    tag = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$base64url$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["decode"])(joseHeader.tag);
                } catch  {
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["JWEInvalid"]('Failed to base64url decode the tag');
                }
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$aesgcmkw$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["unwrap"])(alg, key, encryptedKey, iv, tag);
            }
        default:
            {
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["JOSENotSupported"]('Invalid or unsupported "alg" (JWE Algorithm) header value');
            }
    }
}
const __TURBOPACK__default__export__ = decryptKeyManagement;
}}),
"[project]/node_modules/jose/dist/browser/jwe/flattened/decrypt.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "flattenedDecrypt": (()=>flattenedDecrypt)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$is_object$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/lib/is_object.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/util/errors.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$base64url$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/runtime/base64url.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$buffer_utils$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/lib/buffer_utils.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$is_disjoint$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/lib/is_disjoint.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$validate_crit$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/lib/validate_crit.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$validate_algorithms$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/lib/validate_algorithms.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$decrypt_key_management$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/lib/decrypt_key_management.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$cek$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/lib/cek.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$decrypt$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/runtime/decrypt.js [middleware] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
async function flattenedDecrypt(jwe, key, options) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$is_object$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"])(jwe)) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["JWEInvalid"]('Flattened JWE must be an object');
    }
    if (jwe.protected === undefined && jwe.header === undefined && jwe.unprotected === undefined) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["JWEInvalid"]('JOSE Header missing');
    }
    if (jwe.iv !== undefined && typeof jwe.iv !== 'string') {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["JWEInvalid"]('JWE Initialization Vector incorrect type');
    }
    if (typeof jwe.ciphertext !== 'string') {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["JWEInvalid"]('JWE Ciphertext missing or incorrect type');
    }
    if (jwe.tag !== undefined && typeof jwe.tag !== 'string') {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["JWEInvalid"]('JWE Authentication Tag incorrect type');
    }
    if (jwe.protected !== undefined && typeof jwe.protected !== 'string') {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["JWEInvalid"]('JWE Protected Header incorrect type');
    }
    if (jwe.encrypted_key !== undefined && typeof jwe.encrypted_key !== 'string') {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["JWEInvalid"]('JWE Encrypted Key incorrect type');
    }
    if (jwe.aad !== undefined && typeof jwe.aad !== 'string') {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["JWEInvalid"]('JWE AAD incorrect type');
    }
    if (jwe.header !== undefined && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$is_object$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"])(jwe.header)) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["JWEInvalid"]('JWE Shared Unprotected Header incorrect type');
    }
    if (jwe.unprotected !== undefined && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$is_object$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"])(jwe.unprotected)) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["JWEInvalid"]('JWE Per-Recipient Unprotected Header incorrect type');
    }
    let parsedProt;
    if (jwe.protected) {
        try {
            const protectedHeader = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$base64url$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["decode"])(jwe.protected);
            parsedProt = JSON.parse(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$buffer_utils$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["decoder"].decode(protectedHeader));
        } catch  {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["JWEInvalid"]('JWE Protected Header is invalid');
        }
    }
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$is_disjoint$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"])(parsedProt, jwe.header, jwe.unprotected)) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["JWEInvalid"]('JWE Protected, JWE Unprotected Header, and JWE Per-Recipient Unprotected Header Parameter names must be disjoint');
    }
    const joseHeader = {
        ...parsedProt,
        ...jwe.header,
        ...jwe.unprotected
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$validate_crit$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["JWEInvalid"], new Map(), options?.crit, parsedProt, joseHeader);
    if (joseHeader.zip !== undefined) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["JOSENotSupported"]('JWE "zip" (Compression Algorithm) Header Parameter is not supported.');
    }
    const { alg, enc } = joseHeader;
    if (typeof alg !== 'string' || !alg) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["JWEInvalid"]('missing JWE Algorithm (alg) in JWE Header');
    }
    if (typeof enc !== 'string' || !enc) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["JWEInvalid"]('missing JWE Encryption Algorithm (enc) in JWE Header');
    }
    const keyManagementAlgorithms = options && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$validate_algorithms$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"])('keyManagementAlgorithms', options.keyManagementAlgorithms);
    const contentEncryptionAlgorithms = options && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$validate_algorithms$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"])('contentEncryptionAlgorithms', options.contentEncryptionAlgorithms);
    if (keyManagementAlgorithms && !keyManagementAlgorithms.has(alg) || !keyManagementAlgorithms && alg.startsWith('PBES2')) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["JOSEAlgNotAllowed"]('"alg" (Algorithm) Header Parameter value not allowed');
    }
    if (contentEncryptionAlgorithms && !contentEncryptionAlgorithms.has(enc)) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["JOSEAlgNotAllowed"]('"enc" (Encryption Algorithm) Header Parameter value not allowed');
    }
    let encryptedKey;
    if (jwe.encrypted_key !== undefined) {
        try {
            encryptedKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$base64url$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["decode"])(jwe.encrypted_key);
        } catch  {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["JWEInvalid"]('Failed to base64url decode the encrypted_key');
        }
    }
    let resolvedKey = false;
    if (typeof key === 'function') {
        key = await key(parsedProt, jwe);
        resolvedKey = true;
    }
    let cek;
    try {
        cek = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$decrypt_key_management$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"])(alg, key, encryptedKey, joseHeader, options);
    } catch (err) {
        if (err instanceof TypeError || err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["JWEInvalid"] || err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["JOSENotSupported"]) {
            throw err;
        }
        cek = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$cek$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"])(enc);
    }
    let iv;
    let tag;
    if (jwe.iv !== undefined) {
        try {
            iv = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$base64url$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["decode"])(jwe.iv);
        } catch  {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["JWEInvalid"]('Failed to base64url decode the iv');
        }
    }
    if (jwe.tag !== undefined) {
        try {
            tag = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$base64url$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["decode"])(jwe.tag);
        } catch  {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["JWEInvalid"]('Failed to base64url decode the tag');
        }
    }
    const protectedHeader = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$buffer_utils$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["encoder"].encode(jwe.protected ?? '');
    let additionalData;
    if (jwe.aad !== undefined) {
        additionalData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$buffer_utils$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["concat"])(protectedHeader, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$buffer_utils$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["encoder"].encode('.'), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$buffer_utils$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["encoder"].encode(jwe.aad));
    } else {
        additionalData = protectedHeader;
    }
    let ciphertext;
    try {
        ciphertext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$base64url$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["decode"])(jwe.ciphertext);
    } catch  {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["JWEInvalid"]('Failed to base64url decode the ciphertext');
    }
    const plaintext = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$decrypt$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"])(enc, cek, ciphertext, iv, tag, additionalData);
    const result = {
        plaintext
    };
    if (jwe.protected !== undefined) {
        result.protectedHeader = parsedProt;
    }
    if (jwe.aad !== undefined) {
        try {
            result.additionalAuthenticatedData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$runtime$2f$base64url$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["decode"])(jwe.aad);
        } catch  {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["JWEInvalid"]('Failed to base64url decode the aad');
        }
    }
    if (jwe.unprotected !== undefined) {
        result.sharedUnprotectedHeader = jwe.unprotected;
    }
    if (jwe.header !== undefined) {
        result.unprotectedHeader = jwe.header;
    }
    if (resolvedKey) {
        return {
            ...result,
            key
        };
    }
    return result;
}
}}),
"[project]/node_modules/jose/dist/browser/jwe/compact/decrypt.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "compactDecrypt": (()=>compactDecrypt)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$buffer_utils$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/lib/buffer_utils.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/util/errors.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$jwe$2f$flattened$2f$decrypt$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/jwe/flattened/decrypt.js [middleware] (ecmascript)");
;
;
;
async function compactDecrypt(jwe, key, options) {
    if (jwe instanceof Uint8Array) {
        jwe = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$buffer_utils$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["decoder"].decode(jwe);
    }
    if (typeof jwe !== 'string') {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["JWEInvalid"]('Compact JWE must be a string or Uint8Array');
    }
    const { 0: protectedHeader, 1: encryptedKey, 2: iv, 3: ciphertext, 4: tag, length } = jwe.split('.');
    if (length !== 5) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["JWEInvalid"]('Invalid Compact JWE');
    }
    const decrypted = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$jwe$2f$flattened$2f$decrypt$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["flattenedDecrypt"])({
        ciphertext,
        iv: iv || undefined,
        protected: protectedHeader,
        tag: tag || undefined,
        encrypted_key: encryptedKey || undefined
    }, key, options);
    const result = {
        plaintext: decrypted.plaintext,
        protectedHeader: decrypted.protectedHeader
    };
    if (typeof key === 'function') {
        return {
            ...result,
            key: decrypted.key
        };
    }
    return result;
}
}}),
"[project]/node_modules/jose/dist/browser/lib/jwt_claims_set.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$buffer_utils$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/lib/buffer_utils.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$is_object$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/lib/is_object.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/util/errors.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$secs$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/lib/secs.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$epoch$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/lib/epoch.js [middleware] (ecmascript)");
;
;
;
;
;
const normalizeTyp = (value)=>value.toLowerCase().replace(/^application\//, '');
const checkAudiencePresence = (audPayload, audOption)=>{
    if (typeof audPayload === 'string') {
        return audOption.includes(audPayload);
    }
    if (Array.isArray(audPayload)) {
        return audOption.some(Set.prototype.has.bind(new Set(audPayload)));
    }
    return false;
};
const __TURBOPACK__default__export__ = (protectedHeader, encodedPayload, options = {})=>{
    let payload;
    try {
        payload = JSON.parse(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$buffer_utils$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["decoder"].decode(encodedPayload));
    } catch  {}
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$is_object$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"])(payload)) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["JWTInvalid"]('JWT Claims Set must be a top-level JSON object');
    }
    const { typ } = options;
    if (typ && (typeof protectedHeader.typ !== 'string' || normalizeTyp(protectedHeader.typ) !== normalizeTyp(typ))) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["JWTClaimValidationFailed"]('unexpected "typ" JWT header value', payload, 'typ', 'check_failed');
    }
    const { requiredClaims = [], issuer, subject, audience, maxTokenAge } = options;
    const presenceCheck = [
        ...requiredClaims
    ];
    if (maxTokenAge !== undefined) presenceCheck.push('iat');
    if (audience !== undefined) presenceCheck.push('aud');
    if (subject !== undefined) presenceCheck.push('sub');
    if (issuer !== undefined) presenceCheck.push('iss');
    for (const claim of new Set(presenceCheck.reverse())){
        if (!(claim in payload)) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["JWTClaimValidationFailed"](`missing required "${claim}" claim`, payload, claim, 'missing');
        }
    }
    if (issuer && !(Array.isArray(issuer) ? issuer : [
        issuer
    ]).includes(payload.iss)) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["JWTClaimValidationFailed"]('unexpected "iss" claim value', payload, 'iss', 'check_failed');
    }
    if (subject && payload.sub !== subject) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["JWTClaimValidationFailed"]('unexpected "sub" claim value', payload, 'sub', 'check_failed');
    }
    if (audience && !checkAudiencePresence(payload.aud, typeof audience === 'string' ? [
        audience
    ] : audience)) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["JWTClaimValidationFailed"]('unexpected "aud" claim value', payload, 'aud', 'check_failed');
    }
    let tolerance;
    switch(typeof options.clockTolerance){
        case 'string':
            tolerance = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$secs$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"])(options.clockTolerance);
            break;
        case 'number':
            tolerance = options.clockTolerance;
            break;
        case 'undefined':
            tolerance = 0;
            break;
        default:
            throw new TypeError('Invalid clockTolerance option type');
    }
    const { currentDate } = options;
    const now = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$epoch$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"])(currentDate || new Date());
    if ((payload.iat !== undefined || maxTokenAge) && typeof payload.iat !== 'number') {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["JWTClaimValidationFailed"]('"iat" claim must be a number', payload, 'iat', 'invalid');
    }
    if (payload.nbf !== undefined) {
        if (typeof payload.nbf !== 'number') {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["JWTClaimValidationFailed"]('"nbf" claim must be a number', payload, 'nbf', 'invalid');
        }
        if (payload.nbf > now + tolerance) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["JWTClaimValidationFailed"]('"nbf" claim timestamp check failed', payload, 'nbf', 'check_failed');
        }
    }
    if (payload.exp !== undefined) {
        if (typeof payload.exp !== 'number') {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["JWTClaimValidationFailed"]('"exp" claim must be a number', payload, 'exp', 'invalid');
        }
        if (payload.exp <= now - tolerance) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["JWTExpired"]('"exp" claim timestamp check failed', payload, 'exp', 'check_failed');
        }
    }
    if (maxTokenAge) {
        const age = now - payload.iat;
        const max = typeof maxTokenAge === 'number' ? maxTokenAge : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$secs$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"])(maxTokenAge);
        if (age - tolerance > max) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["JWTExpired"]('"iat" claim timestamp check failed (too far in the past)', payload, 'iat', 'check_failed');
        }
        if (age < 0 - tolerance) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["JWTClaimValidationFailed"]('"iat" claim timestamp check failed (it should be in the past)', payload, 'iat', 'check_failed');
        }
    }
    return payload;
};
}}),
"[project]/node_modules/jose/dist/browser/jwt/decrypt.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "jwtDecrypt": (()=>jwtDecrypt)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$jwe$2f$compact$2f$decrypt$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/jwe/compact/decrypt.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$jwt_claims_set$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/lib/jwt_claims_set.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/util/errors.js [middleware] (ecmascript)");
;
;
;
async function jwtDecrypt(jwt, key, options) {
    const decrypted = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$jwe$2f$compact$2f$decrypt$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["compactDecrypt"])(jwt, key, options);
    const payload = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$jwt_claims_set$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"])(decrypted.protectedHeader, decrypted.plaintext, options);
    const { protectedHeader } = decrypted;
    if (protectedHeader.iss !== undefined && protectedHeader.iss !== payload.iss) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["JWTClaimValidationFailed"]('replicated "iss" claim header parameter mismatch', payload, 'iss', 'mismatch');
    }
    if (protectedHeader.sub !== undefined && protectedHeader.sub !== payload.sub) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["JWTClaimValidationFailed"]('replicated "sub" claim header parameter mismatch', payload, 'sub', 'mismatch');
    }
    if (protectedHeader.aud !== undefined && JSON.stringify(protectedHeader.aud) !== JSON.stringify(payload.aud)) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["JWTClaimValidationFailed"]('replicated "aud" claim header parameter mismatch', payload, 'aud', 'mismatch');
    }
    const result = {
        payload,
        protectedHeader
    };
    if (typeof key === 'function') {
        return {
            ...result,
            key: decrypted.key
        };
    }
    return result;
}
}}),
"[project]/node_modules/@panva/hkdf/dist/web/runtime/hkdf.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
const getGlobal = ()=>{
    if (typeof globalThis !== 'undefined') return globalThis;
    if (typeof self !== 'undefined') return self;
    if ("TURBOPACK compile-time falsy", 0) {
        "TURBOPACK unreachable";
    }
    throw new Error('unable to locate global object');
};
const __TURBOPACK__default__export__ = async (digest, ikm, salt, info, keylen)=>{
    const { crypto: { subtle } } = getGlobal();
    return new Uint8Array(await subtle.deriveBits({
        name: 'HKDF',
        hash: `SHA-${digest.substr(3)}`,
        salt,
        info
    }, await subtle.importKey('raw', ikm, 'HKDF', false, [
        'deriveBits'
    ]), keylen << 3));
};
}}),
"[project]/node_modules/@panva/hkdf/dist/web/index.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>hkdf),
    "hkdf": (()=>hkdf)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$panva$2f$hkdf$2f$dist$2f$web$2f$runtime$2f$hkdf$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@panva/hkdf/dist/web/runtime/hkdf.js [middleware] (ecmascript)");
;
function normalizeDigest(digest) {
    switch(digest){
        case 'sha256':
        case 'sha384':
        case 'sha512':
        case 'sha1':
            return digest;
        default:
            throw new TypeError('unsupported "digest" value');
    }
}
function normalizeUint8Array(input, label) {
    if (typeof input === 'string') return new TextEncoder().encode(input);
    if (!(input instanceof Uint8Array)) throw new TypeError(`"${label}"" must be an instance of Uint8Array or a string`);
    return input;
}
function normalizeIkm(input) {
    const ikm = normalizeUint8Array(input, 'ikm');
    if (!ikm.byteLength) throw new TypeError(`"ikm" must be at least one byte in length`);
    return ikm;
}
function normalizeInfo(input) {
    const info = normalizeUint8Array(input, 'info');
    if (info.byteLength > 1024) {
        throw TypeError('"info" must not contain more than 1024 bytes');
    }
    return info;
}
function normalizeKeylen(input, digest) {
    if (typeof input !== 'number' || !Number.isInteger(input) || input < 1) {
        throw new TypeError('"keylen" must be a positive integer');
    }
    const hashlen = parseInt(digest.substr(3), 10) >> 3 || 20;
    if (input > 255 * hashlen) {
        throw new TypeError('"keylen" too large');
    }
    return input;
}
async function hkdf(digest, ikm, salt, info, keylen) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$panva$2f$hkdf$2f$dist$2f$web$2f$runtime$2f$hkdf$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"])(normalizeDigest(digest), normalizeIkm(ikm), normalizeUint8Array(salt, 'salt'), normalizeInfo(info), normalizeKeylen(keylen, digest));
}
;
}}),
"[project]/node_modules/@auth/core/jwt.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
/**
 *
 *
 * This module contains functions and types
 * to encode and decode {@link https://authjs.dev/concepts/session-strategies#jwt-session JWT}s
 * issued and used by Auth.js.
 *
 * The JWT issued by Auth.js is _encrypted by default_, using the _A256CBC-HS512_ algorithm ({@link https://www.rfc-editor.org/rfc/rfc7518.html#section-5.2.5 JWE}).
 * It uses the `AUTH_SECRET` environment variable or the passed `secret` property to derive a suitable encryption key.
 *
 * :::info Note
 * Auth.js JWTs are meant to be used by the same app that issued them.
 * If you need JWT authentication for your third-party API, you should rely on your Identity Provider instead.
 * :::
 *
 * ## Installation
 *
 * ```bash npm2yarn
 * npm install @auth/core
 * ```
 *
 * You can then import this submodule from `@auth/core/jwt`.
 *
 * ## Usage
 *
 * :::warning Warning
 * This module *will* be refactored/changed. We do not recommend relying on it right now.
 * :::
 *
 *
 * ## Resources
 *
 * - [What is a JWT session strategy](https://authjs.dev/concepts/session-strategies#jwt-session)
 * - [RFC7519 - JSON Web Token (JWT)](https://www.rfc-editor.org/rfc/rfc7519)
 *
 * @module jwt
 */ __turbopack_esm__({
    "decode": (()=>decode),
    "encode": (()=>encode),
    "getToken": (()=>getToken)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$utils$2f$cookie$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@auth/core/lib/utils/cookie.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@auth/core/errors.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$cookie$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/cookie/index.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$jwk$2f$thumbprint$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/jwk/thumbprint.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$base64url$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__base64url$3e$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/util/base64url.js [middleware] (ecmascript) <export * as base64url>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$jwt$2f$encrypt$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/jwt/encrypt.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$jwt$2f$decrypt$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/jwt/decrypt.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$panva$2f$hkdf$2f$dist$2f$web$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@panva/hkdf/dist/web/index.js [middleware] (ecmascript)");
;
;
;
;
;
const DEFAULT_MAX_AGE = 30 * 24 * 60 * 60; // 30 days
const now = ()=>Date.now() / 1000 | 0;
const alg = "dir";
const enc = "A256CBC-HS512";
async function encode(params) {
    const { token = {}, secret, maxAge = DEFAULT_MAX_AGE, salt } = params;
    const secrets = Array.isArray(secret) ? secret : [
        secret
    ];
    const encryptionSecret = await getDerivedEncryptionKey(enc, secrets[0], salt);
    const thumbprint = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$jwk$2f$thumbprint$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["calculateJwkThumbprint"])({
        kty: "oct",
        k: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$base64url$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__base64url$3e$__["base64url"].encode(encryptionSecret)
    }, `sha${encryptionSecret.byteLength << 3}`);
    // @ts-expect-error `jose` allows any object as payload.
    return await new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$jwt$2f$encrypt$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["EncryptJWT"](token).setProtectedHeader({
        alg,
        enc,
        kid: thumbprint
    }).setIssuedAt().setExpirationTime(now() + maxAge).setJti(crypto.randomUUID()).encrypt(encryptionSecret);
}
async function decode(params) {
    const { token, secret, salt } = params;
    const secrets = Array.isArray(secret) ? secret : [
        secret
    ];
    if (!token) return null;
    const { payload } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$jwt$2f$decrypt$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["jwtDecrypt"])(token, async ({ kid, enc })=>{
        for (const secret of secrets){
            const encryptionSecret = await getDerivedEncryptionKey(enc, secret, salt);
            if (kid === undefined) return encryptionSecret;
            const thumbprint = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$jwk$2f$thumbprint$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["calculateJwkThumbprint"])({
                kty: "oct",
                k: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$base64url$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__base64url$3e$__["base64url"].encode(encryptionSecret)
            }, `sha${encryptionSecret.byteLength << 3}`);
            if (kid === thumbprint) return encryptionSecret;
        }
        throw new Error("no matching decryption secret");
    }, {
        clockTolerance: 15,
        keyManagementAlgorithms: [
            alg
        ],
        contentEncryptionAlgorithms: [
            enc,
            "A256GCM"
        ]
    });
    return payload;
}
async function getToken(params) {
    const { secureCookie, cookieName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$utils$2f$cookie$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["defaultCookies"])(secureCookie ?? false).sessionToken.name, decode: _decode = decode, salt = cookieName, secret, logger = console, raw, req } = params;
    if (!req) throw new Error("Must pass `req` to JWT getToken()");
    const headers = req.headers instanceof Headers ? req.headers : new Headers(req.headers);
    const sessionStore = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$utils$2f$cookie$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["SessionStore"]({
        name: cookieName,
        options: {
            secure: secureCookie
        }
    }, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$cookie$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["parse"])(headers.get("cookie") ?? ""), logger);
    let token = sessionStore.value;
    const authorizationHeader = headers.get("authorization");
    if (!token && authorizationHeader?.split(" ")[0] === "Bearer") {
        const urlEncodedToken = authorizationHeader.split(" ")[1];
        token = decodeURIComponent(urlEncodedToken);
    }
    if (!token) return null;
    if (raw) return token;
    if (!secret) throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["MissingSecret"]("Must pass `secret` if not set to JWT getToken()");
    try {
        return await _decode({
            token,
            secret,
            salt
        });
    } catch  {
        return null;
    }
}
async function getDerivedEncryptionKey(enc, keyMaterial, salt) {
    let length;
    switch(enc){
        case "A256CBC-HS512":
            length = 64;
            break;
        case "A256GCM":
            length = 32;
            break;
        default:
            throw new Error("Unsupported JWT Content Encryption Algorithm");
    }
    return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$panva$2f$hkdf$2f$dist$2f$web$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["hkdf"])("sha256", keyMaterial, salt, `Auth.js Generated Encryption Key (${salt})`, length);
}
}}),
"[project]/node_modules/@auth/core/lib/utils/callback-url.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
/**
 * Get callback URL based on query param / cookie + validation,
 * and add it to `req.options.callbackUrl`.
 */ __turbopack_esm__({
    "createCallbackUrl": (()=>createCallbackUrl)
});
async function createCallbackUrl({ options, paramValue, cookieValue }) {
    const { url, callbacks } = options;
    let callbackUrl = url.origin;
    if (paramValue) {
        // If callbackUrl form field or query parameter is passed try to use it if allowed
        callbackUrl = await callbacks.redirect({
            url: paramValue,
            baseUrl: url.origin
        });
    } else if (cookieValue) {
        // If no callbackUrl specified, try using the value from the cookie if allowed
        callbackUrl = await callbacks.redirect({
            url: cookieValue,
            baseUrl: url.origin
        });
    }
    return {
        callbackUrl,
        // Save callback URL in a cookie so that it can be used for subsequent requests in signin/signout/callback flow
        callbackUrlCookie: callbackUrl !== cookieValue ? callbackUrl : undefined
    };
}
}}),
"[project]/node_modules/@auth/core/lib/utils/logger.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "setLogger": (()=>setLogger)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@auth/core/errors.js [middleware] (ecmascript)");
;
const red = "\x1b[31m";
const yellow = "\x1b[33m";
const grey = "\x1b[90m";
const reset = "\x1b[0m";
const defaultLogger = {
    error (error) {
        const name = error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["AuthError"] ? error.type : error.name;
        console.error(`${red}[auth][error]${reset} ${name}: ${error.message}`);
        if (error.cause && typeof error.cause === "object" && "err" in error.cause && error.cause.err instanceof Error) {
            const { err, ...data } = error.cause;
            console.error(`${red}[auth][cause]${reset}:`, err.stack);
            if (data) console.error(`${red}[auth][details]${reset}:`, JSON.stringify(data, null, 2));
        } else if (error.stack) {
            console.error(error.stack.replace(/.*/, "").substring(1));
        }
    },
    warn (code) {
        const url = `https://warnings.authjs.dev#${code}`;
        console.warn(`${yellow}[auth][warn][${code}]${reset}`, `Read more: ${url}`);
    },
    debug (message, metadata) {
        console.log(`${grey}[auth][debug]:${reset} ${message}`, JSON.stringify(metadata, null, 2));
    }
};
function setLogger(config) {
    const newLogger = {
        ...defaultLogger
    };
    // Turn off debug logging if `debug` isn't set to `true`
    if (!config.debug) newLogger.debug = ()=>{};
    if (config.logger?.error) newLogger.error = config.logger.error;
    if (config.logger?.warn) newLogger.warn = config.logger.warn;
    if (config.logger?.debug) newLogger.debug = config.logger.debug;
    config.logger ?? (config.logger = newLogger);
    return newLogger;
}
}}),
"[project]/node_modules/@auth/core/lib/utils/actions.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "isAuthAction": (()=>isAuthAction)
});
const actions = [
    "providers",
    "session",
    "csrf",
    "signin",
    "signout",
    "callback",
    "verify-request",
    "error",
    "webauthn-options"
];
function isAuthAction(action) {
    return actions.includes(action);
}
}}),
"[project]/node_modules/@auth/core/lib/utils/web.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "createHash": (()=>createHash),
    "parseActionAndProviderId": (()=>parseActionAndProviderId),
    "randomString": (()=>randomString),
    "toInternalRequest": (()=>toInternalRequest),
    "toRequest": (()=>toRequest),
    "toResponse": (()=>toResponse)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$cookie$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/cookie/index.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@auth/core/errors.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$utils$2f$logger$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@auth/core/lib/utils/logger.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$utils$2f$actions$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@auth/core/lib/utils/actions.js [middleware] (ecmascript)");
;
;
;
;
async function getBody(req) {
    if (!("body" in req) || !req.body || req.method !== "POST") return;
    const contentType = req.headers.get("content-type");
    if (contentType?.includes("application/json")) {
        return await req.json();
    } else if (contentType?.includes("application/x-www-form-urlencoded")) {
        const params = new URLSearchParams(await req.text());
        return Object.fromEntries(params);
    }
}
async function toInternalRequest(req, config) {
    try {
        if (req.method !== "GET" && req.method !== "POST") throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["UnknownAction"]("Only GET and POST requests are supported");
        // Defaults are usually set in the `init` function, but this is needed below
        config.basePath ?? (config.basePath = "/auth");
        const url = new URL(req.url);
        const { action, providerId } = parseActionAndProviderId(url.pathname, config.basePath);
        return {
            url,
            action,
            providerId,
            method: req.method,
            headers: Object.fromEntries(req.headers),
            body: req.body ? await getBody(req) : undefined,
            cookies: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$cookie$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["parse"])(req.headers.get("cookie") ?? "") ?? {},
            error: url.searchParams.get("error") ?? undefined,
            query: Object.fromEntries(url.searchParams)
        };
    } catch (e) {
        const logger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$utils$2f$logger$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["setLogger"])(config);
        logger.error(e);
        logger.debug("request", req);
    }
}
function toRequest(request) {
    return new Request(request.url, {
        headers: request.headers,
        method: request.method,
        body: request.method === "POST" ? JSON.stringify(request.body ?? {}) : undefined
    });
}
function toResponse(res) {
    const headers = new Headers(res.headers);
    res.cookies?.forEach((cookie)=>{
        const { name, value, options } = cookie;
        const cookieHeader = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$cookie$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["serialize"])(name, value, options);
        if (headers.has("Set-Cookie")) headers.append("Set-Cookie", cookieHeader);
        else headers.set("Set-Cookie", cookieHeader);
    });
    let body = res.body;
    if (headers.get("content-type") === "application/json") body = JSON.stringify(res.body);
    else if (headers.get("content-type") === "application/x-www-form-urlencoded") body = new URLSearchParams(res.body).toString();
    const status = res.redirect ? 302 : res.status ?? 200;
    const response = new Response(body, {
        headers,
        status
    });
    if (res.redirect) response.headers.set("Location", res.redirect);
    return response;
}
async function createHash(message) {
    const data = new TextEncoder().encode(message);
    const hash = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(hash)).map((b)=>b.toString(16).padStart(2, "0")).join("").toString();
}
function randomString(size) {
    const i2hex = (i)=>("0" + i.toString(16)).slice(-2);
    const r = (a, i)=>a + i2hex(i);
    const bytes = crypto.getRandomValues(new Uint8Array(size));
    return Array.from(bytes).reduce(r, "");
}
function parseActionAndProviderId(pathname, base) {
    const a = pathname.match(new RegExp(`^${base}(.+)`));
    if (a === null) throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["UnknownAction"](`Cannot parse action at ${pathname}`);
    const actionAndProviderId = a.at(-1);
    const b = actionAndProviderId.replace(/^\//, "").split("/").filter(Boolean);
    if (b.length !== 1 && b.length !== 2) throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["UnknownAction"](`Cannot parse action at ${pathname}`);
    const [action, providerId] = b;
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$utils$2f$actions$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["isAuthAction"])(action)) throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["UnknownAction"](`Cannot parse action at ${pathname}`);
    if (providerId && ![
        "signin",
        "callback",
        "webauthn-options"
    ].includes(action)) throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["UnknownAction"](`Cannot parse action at ${pathname}`);
    return {
        action,
        providerId
    };
}
}}),
"[project]/node_modules/@auth/core/lib/actions/callback/oauth/csrf-token.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "createCSRFToken": (()=>createCSRFToken),
    "validateCSRF": (()=>validateCSRF)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$utils$2f$web$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@auth/core/lib/utils/web.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@auth/core/errors.js [middleware] (ecmascript)");
;
;
async function createCSRFToken({ options, cookieValue, isPost, bodyValue }) {
    if (cookieValue) {
        const [csrfToken, csrfTokenHash] = cookieValue.split("|");
        const expectedCsrfTokenHash = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$utils$2f$web$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["createHash"])(`${csrfToken}${options.secret}`);
        if (csrfTokenHash === expectedCsrfTokenHash) {
            // If hash matches then we trust the CSRF token value
            // If this is a POST request and the CSRF Token in the POST request matches
            // the cookie we have already verified is the one we have set, then the token is verified!
            const csrfTokenVerified = isPost && csrfToken === bodyValue;
            return {
                csrfTokenVerified,
                csrfToken
            };
        }
    }
    // New CSRF token
    const csrfToken = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$utils$2f$web$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["randomString"])(32);
    const csrfTokenHash = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$utils$2f$web$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["createHash"])(`${csrfToken}${options.secret}`);
    const cookie = `${csrfToken}|${csrfTokenHash}`;
    return {
        cookie,
        csrfToken
    };
}
function validateCSRF(action, verified) {
    if (verified) return;
    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["MissingCSRF"](`CSRF token was missing during an action ${action}`);
}
}}),
"[project]/node_modules/@auth/core/lib/utils/merge.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "merge": (()=>merge)
});
function isObject(item) {
    return item !== null && typeof item === "object";
}
function merge(target, ...sources) {
    if (!sources.length) return target;
    const source = sources.shift();
    if (isObject(target) && isObject(source)) {
        for(const key in source){
            if (isObject(source[key])) {
                if (!isObject(target[key])) target[key] = Array.isArray(source[key]) ? [] : {};
                merge(target[key], source[key]);
            } else if (source[key] !== undefined) target[key] = source[key];
        }
    }
    return merge(target, ...sources);
}
}}),
"[project]/node_modules/@auth/core/lib/symbols.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
/**
 * :::danger
 * This option is intended for framework authors.
 * :::
 *
 * Auth.js comes with built-in CSRF protection, but
 * if you are implementing a framework that is already protected against CSRF attacks, you can skip this check by
 * passing this value to {@link AuthConfig.skipCSRFCheck}.
 */ __turbopack_esm__({
    "conformInternal": (()=>conformInternal),
    "customFetch": (()=>customFetch),
    "raw": (()=>raw),
    "skipCSRFCheck": (()=>skipCSRFCheck)
});
const skipCSRFCheck = Symbol("skip-csrf-check");
const raw = Symbol("return-type-raw");
const customFetch = Symbol("custom-fetch");
const conformInternal = Symbol("conform-internal");
}}),
"[project]/node_modules/@auth/core/lib/utils/providers.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>parseProviders),
    "isOAuth2Provider": (()=>isOAuth2Provider),
    "isOAuthProvider": (()=>isOAuthProvider),
    "isOIDCProvider": (()=>isOIDCProvider)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$utils$2f$merge$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@auth/core/lib/utils/merge.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$symbols$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@auth/core/lib/symbols.js [middleware] (ecmascript)");
;
;
function parseProviders(params) {
    const { providerId, config } = params;
    const url = new URL(config.basePath ?? "/auth", params.url.origin);
    const providers = config.providers.map((p)=>{
        const provider = typeof p === "function" ? p() : p;
        const { options: userOptions, ...defaults } = provider;
        const id = userOptions?.id ?? defaults.id;
        // TODO: Support if properties have different types, e.g. authorization: string or object
        const merged = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$utils$2f$merge$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["merge"])(defaults, userOptions, {
            signinUrl: `${url}/signin/${id}`,
            callbackUrl: `${url}/callback/${id}`
        });
        if (provider.type === "oauth" || provider.type === "oidc") {
            merged.redirectProxyUrl ?? (merged.redirectProxyUrl = userOptions?.redirectProxyUrl ?? config.redirectProxyUrl);
            const normalized = normalizeOAuth(merged);
            // We currently don't support redirect proxies for response_mode=form_post
            if (normalized.authorization?.url.searchParams.get("response_mode") === "form_post") {
                delete normalized.redirectProxyUrl;
            }
            // @ts-expect-error Symbols don't get merged by the `merge` function
            // so we need to do it manually.
            normalized[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$symbols$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["customFetch"]] ?? (normalized[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$symbols$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["customFetch"]] = userOptions?.[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$symbols$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["customFetch"]]);
            return normalized;
        }
        return merged;
    });
    return {
        providers,
        provider: providers.find(({ id })=>id === providerId)
    };
}
// TODO: Also add discovery here, if some endpoints/config are missing.
// We should return both a client and authorization server config.
function normalizeOAuth(c) {
    if (c.issuer) c.wellKnown ?? (c.wellKnown = `${c.issuer}/.well-known/openid-configuration`);
    const authorization = normalizeEndpoint(c.authorization, c.issuer);
    if (authorization && !authorization.url?.searchParams.has("scope")) {
        authorization.url.searchParams.set("scope", "openid profile email");
    }
    const token = normalizeEndpoint(c.token, c.issuer);
    const userinfo = normalizeEndpoint(c.userinfo, c.issuer);
    const checks = c.checks ?? [
        "pkce"
    ];
    if (c.redirectProxyUrl) {
        if (!checks.includes("state")) checks.push("state");
        c.redirectProxyUrl = `${c.redirectProxyUrl}/callback/${c.id}`;
    }
    return {
        ...c,
        authorization,
        token,
        checks,
        userinfo,
        profile: c.profile ?? defaultProfile,
        account: c.account ?? defaultAccount
    };
}
/**
 * Returns basic user profile from the userinfo response/`id_token` claims.
 * The returned `id` will become the `account.providerAccountId`. `user.id`
 * and `account.id` are auto-generated UUID's.
 *
 * The result if this function is used to create the `User` in the database.
 * @see https://authjs.dev/reference/core/adapters#user
 * @see https://openid.net/specs/openid-connect-core-1_0.html#IDToken
 * @see https://openid.net/specs/openid-connect-core-1_0.html#
 */ const defaultProfile = (profile)=>{
    return stripUndefined({
        id: profile.sub ?? profile.id ?? crypto.randomUUID(),
        name: profile.name ?? profile.nickname ?? profile.preferred_username,
        email: profile.email,
        image: profile.picture
    });
};
/**
 * Returns basic OAuth/OIDC values from the token response.
 * @see https://www.ietf.org/rfc/rfc6749.html#section-5.1
 * @see https://openid.net/specs/openid-connect-core-1_0.html#TokenResponse
 * @see https://authjs.dev/reference/core/adapters#account
 */ const defaultAccount = (account)=>{
    return stripUndefined({
        access_token: account.access_token,
        id_token: account.id_token,
        refresh_token: account.refresh_token,
        expires_at: account.expires_at,
        scope: account.scope,
        token_type: account.token_type,
        session_state: account.session_state
    });
};
function stripUndefined(o) {
    const result = {};
    for (const [k, v] of Object.entries(o)){
        if (v !== undefined) result[k] = v;
    }
    return result;
}
function normalizeEndpoint(e, issuer) {
    if (!e && issuer) return;
    if (typeof e === "string") {
        return {
            url: new URL(e)
        };
    }
    // If e.url is undefined, it's because the provider config
    // assumes that we will use the issuer endpoint.
    // The existence of either e.url or provider.issuer is checked in
    // assert.ts. We fallback to "https://authjs.dev" to be able to pass around
    // a valid URL even if the user only provided params.
    // NOTE: This need to be checked when constructing the URL
    // for the authorization, token and userinfo endpoints.
    const url = new URL(e?.url ?? "https://authjs.dev");
    if (e?.params != null) {
        for (let [key, value] of Object.entries(e.params)){
            if (key === "claims") {
                value = JSON.stringify(value);
            }
            url.searchParams.set(key, String(value));
        }
    }
    return {
        url,
        request: e?.request,
        conform: e?.conform,
        ...e?.clientPrivateKey ? {
            clientPrivateKey: e?.clientPrivateKey
        } : null
    };
}
function isOIDCProvider(provider) {
    return provider.type === "oidc";
}
function isOAuth2Provider(provider) {
    return provider.type === "oauth";
}
function isOAuthProvider(provider) {
    return provider.type === "oauth" || provider.type === "oidc";
}
}}),
"[project]/node_modules/@auth/core/lib/init.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "defaultCallbacks": (()=>defaultCallbacks),
    "init": (()=>init)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$jwt$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@auth/core/jwt.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$utils$2f$callback$2d$url$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@auth/core/lib/utils/callback-url.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$utils$2f$cookie$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@auth/core/lib/utils/cookie.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$actions$2f$callback$2f$oauth$2f$csrf$2d$token$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@auth/core/lib/actions/callback/oauth/csrf-token.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@auth/core/errors.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$utils$2f$providers$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@auth/core/lib/utils/providers.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$utils$2f$logger$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@auth/core/lib/utils/logger.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$utils$2f$merge$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@auth/core/lib/utils/merge.js [middleware] (ecmascript)");
;
;
;
;
;
;
;
;
const defaultCallbacks = {
    signIn () {
        return true;
    },
    redirect ({ url, baseUrl }) {
        if (url.startsWith("/")) return `${baseUrl}${url}`;
        else if (new URL(url).origin === baseUrl) return url;
        return baseUrl;
    },
    session ({ session }) {
        return {
            user: {
                name: session.user?.name,
                email: session.user?.email,
                image: session.user?.image
            },
            expires: session.expires?.toISOString?.() ?? session.expires
        };
    },
    jwt ({ token }) {
        return token;
    }
};
async function init({ authOptions: config, providerId, action, url, cookies: reqCookies, callbackUrl: reqCallbackUrl, csrfToken: reqCsrfToken, csrfDisabled, isPost }) {
    const logger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$utils$2f$logger$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["setLogger"])(config);
    const { providers, provider } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$utils$2f$providers$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"])({
        url,
        providerId,
        config
    });
    const maxAge = 30 * 24 * 60 * 60; // Sessions expire after 30 days of being idle by default
    let isOnRedirectProxy = false;
    if ((provider?.type === "oauth" || provider?.type === "oidc") && provider.redirectProxyUrl) {
        try {
            isOnRedirectProxy = new URL(provider.redirectProxyUrl).origin === url.origin;
        } catch  {
            throw new TypeError(`redirectProxyUrl must be a valid URL. Received: ${provider.redirectProxyUrl}`);
        }
    }
    // User provided options are overridden by other options,
    // except for the options with special handling above
    const options = {
        debug: false,
        pages: {},
        theme: {
            colorScheme: "auto",
            logo: "",
            brandColor: "",
            buttonText: ""
        },
        // Custom options override defaults
        ...config,
        // These computed settings can have values in userOptions but we override them
        // and are request-specific.
        url,
        action,
        // @ts-expect-errors
        provider,
        cookies: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$utils$2f$merge$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["merge"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$utils$2f$cookie$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__.defaultCookies(config.useSecureCookies ?? url.protocol === "https:"), config.cookies),
        providers,
        // Session options
        session: {
            // If no adapter specified, force use of JSON Web Tokens (stateless)
            strategy: config.adapter ? "database" : "jwt",
            maxAge,
            updateAge: 24 * 60 * 60,
            generateSessionToken: ()=>crypto.randomUUID(),
            ...config.session
        },
        // JWT options
        jwt: {
            secret: config.secret,
            maxAge: config.session?.maxAge ?? maxAge,
            encode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$jwt$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__.encode,
            decode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$jwt$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__.decode,
            ...config.jwt
        },
        // Event messages
        events: eventsErrorHandler(config.events ?? {}, logger),
        adapter: adapterErrorHandler(config.adapter, logger),
        // Callback functions
        callbacks: {
            ...defaultCallbacks,
            ...config.callbacks
        },
        logger,
        callbackUrl: url.origin,
        isOnRedirectProxy,
        experimental: {
            ...config.experimental
        }
    };
    // Init cookies
    const cookies = [];
    if (csrfDisabled) {
        options.csrfTokenVerified = true;
    } else {
        const { csrfToken, cookie: csrfCookie, csrfTokenVerified } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$actions$2f$callback$2f$oauth$2f$csrf$2d$token$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["createCSRFToken"])({
            options,
            cookieValue: reqCookies?.[options.cookies.csrfToken.name],
            isPost,
            bodyValue: reqCsrfToken
        });
        options.csrfToken = csrfToken;
        options.csrfTokenVerified = csrfTokenVerified;
        if (csrfCookie) {
            cookies.push({
                name: options.cookies.csrfToken.name,
                value: csrfCookie,
                options: options.cookies.csrfToken.options
            });
        }
    }
    const { callbackUrl, callbackUrlCookie } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$utils$2f$callback$2d$url$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["createCallbackUrl"])({
        options,
        cookieValue: reqCookies?.[options.cookies.callbackUrl.name],
        paramValue: reqCallbackUrl
    });
    options.callbackUrl = callbackUrl;
    if (callbackUrlCookie) {
        cookies.push({
            name: options.cookies.callbackUrl.name,
            value: callbackUrlCookie,
            options: options.cookies.callbackUrl.options
        });
    }
    return {
        options,
        cookies
    };
}
/** Wraps an object of methods and adds error handling. */ function eventsErrorHandler(methods, logger) {
    return Object.keys(methods).reduce((acc, name)=>{
        acc[name] = async (...args)=>{
            try {
                const method = methods[name];
                return await method(...args);
            } catch (e) {
                logger.error(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["EventError"](e));
            }
        };
        return acc;
    }, {});
}
/** Handles adapter induced errors. */ function adapterErrorHandler(adapter, logger) {
    if (!adapter) return;
    return Object.keys(adapter).reduce((acc, name)=>{
        acc[name] = async (...args)=>{
            try {
                logger.debug(`adapter_${name}`, {
                    args
                });
                const method = adapter[name];
                return await method(...args);
            } catch (e) {
                const error = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["AdapterError"](e);
                logger.error(error);
                throw error;
            }
        };
        return acc;
    }, {});
}
}}),
"[project]/node_modules/preact/dist/preact.module.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "Component": (()=>d),
    "Fragment": (()=>p),
    "cloneElement": (()=>q),
    "createContext": (()=>B),
    "createElement": (()=>h),
    "createRef": (()=>y),
    "h": (()=>h),
    "hydrate": (()=>S),
    "isValidElement": (()=>i),
    "options": (()=>l),
    "render": (()=>P),
    "toChildArray": (()=>x)
});
var n, l, u, i, t, o, r, f = {}, e = [], c = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
function s(n, l) {
    for(var u in l)n[u] = l[u];
    return n;
}
function a(n) {
    var l = n.parentNode;
    l && l.removeChild(n);
}
function h(l, u, i) {
    var t, o, r, f = {};
    for(r in u)"key" == r ? t = u[r] : "ref" == r ? o = u[r] : f[r] = u[r];
    if (arguments.length > 2 && (f.children = arguments.length > 3 ? n.call(arguments, 2) : i), "function" == typeof l && null != l.defaultProps) for(r in l.defaultProps)void 0 === f[r] && (f[r] = l.defaultProps[r]);
    return v(l, f, t, o, null);
}
function v(n, i, t, o, r) {
    var f = {
        type: n,
        props: i,
        key: t,
        ref: o,
        __k: null,
        __: null,
        __b: 0,
        __e: null,
        __d: void 0,
        __c: null,
        __h: null,
        constructor: void 0,
        __v: null == r ? ++u : r
    };
    return null == r && null != l.vnode && l.vnode(f), f;
}
function y() {
    return {
        current: null
    };
}
function p(n) {
    return n.children;
}
function d(n, l) {
    this.props = n, this.context = l;
}
function _(n, l) {
    if (null == l) return n.__ ? _(n.__, n.__.__k.indexOf(n) + 1) : null;
    for(var u; l < n.__k.length; l++)if (null != (u = n.__k[l]) && null != u.__e) return u.__e;
    return "function" == typeof n.type ? _(n) : null;
}
function k(n) {
    var l, u;
    if (null != (n = n.__) && null != n.__c) {
        for(n.__e = n.__c.base = null, l = 0; l < n.__k.length; l++)if (null != (u = n.__k[l]) && null != u.__e) {
            n.__e = n.__c.base = u.__e;
            break;
        }
        return k(n);
    }
}
function b(n) {
    (!n.__d && (n.__d = !0) && t.push(n) && !g.__r++ || o !== l.debounceRendering) && ((o = l.debounceRendering) || setTimeout)(g);
}
function g() {
    for(var n; g.__r = t.length;)n = t.sort(function(n, l) {
        return n.__v.__b - l.__v.__b;
    }), t = [], n.some(function(n) {
        var l, u, i, t, o, r;
        n.__d && (o = (t = (l = n).__v).__e, (r = l.__P) && (u = [], (i = s({}, t)).__v = t.__v + 1, j(r, t, i, l.__n, void 0 !== r.ownerSVGElement, null != t.__h ? [
            o
        ] : null, u, null == o ? _(t) : o, t.__h), z(u, t), t.__e != o && k(t)));
    });
}
function w(n, l, u, i, t, o, r, c, s, a) {
    var h, y, d, k, b, g, w, x = i && i.__k || e, C = x.length;
    for(u.__k = [], h = 0; h < l.length; h++)if (null != (k = u.__k[h] = null == (k = l[h]) || "boolean" == typeof k ? null : "string" == typeof k || "number" == typeof k || "bigint" == typeof k ? v(null, k, null, null, k) : Array.isArray(k) ? v(p, {
        children: k
    }, null, null, null) : k.__b > 0 ? v(k.type, k.props, k.key, k.ref ? k.ref : null, k.__v) : k)) {
        if (k.__ = u, k.__b = u.__b + 1, null === (d = x[h]) || d && k.key == d.key && k.type === d.type) x[h] = void 0;
        else for(y = 0; y < C; y++){
            if ((d = x[y]) && k.key == d.key && k.type === d.type) {
                x[y] = void 0;
                break;
            }
            d = null;
        }
        j(n, k, d = d || f, t, o, r, c, s, a), b = k.__e, (y = k.ref) && d.ref != y && (w || (w = []), d.ref && w.push(d.ref, null, k), w.push(y, k.__c || b, k)), null != b ? (null == g && (g = b), "function" == typeof k.type && k.__k === d.__k ? k.__d = s = m(k, s, n) : s = A(n, k, d, x, b, s), "function" == typeof u.type && (u.__d = s)) : s && d.__e == s && s.parentNode != n && (s = _(d));
    }
    for(u.__e = g, h = C; h--;)null != x[h] && N(x[h], x[h]);
    if (w) for(h = 0; h < w.length; h++)M(w[h], w[++h], w[++h]);
}
function m(n, l, u) {
    for(var i, t = n.__k, o = 0; t && o < t.length; o++)(i = t[o]) && (i.__ = n, l = "function" == typeof i.type ? m(i, l, u) : A(u, i, i, t, i.__e, l));
    return l;
}
function x(n, l) {
    return l = l || [], null == n || "boolean" == typeof n || (Array.isArray(n) ? n.some(function(n) {
        x(n, l);
    }) : l.push(n)), l;
}
function A(n, l, u, i, t, o) {
    var r, f, e;
    if (void 0 !== l.__d) r = l.__d, l.__d = void 0;
    else if (null == u || t != o || null == t.parentNode) n: if (null == o || o.parentNode !== n) n.appendChild(t), r = null;
    else {
        for(f = o, e = 0; (f = f.nextSibling) && e < i.length; e += 1)if (f == t) break n;
        n.insertBefore(t, o), r = o;
    }
    return void 0 !== r ? r : t.nextSibling;
}
function C(n, l, u, i, t) {
    var o;
    for(o in u)"children" === o || "key" === o || o in l || H(n, o, null, u[o], i);
    for(o in l)t && "function" != typeof l[o] || "children" === o || "key" === o || "value" === o || "checked" === o || u[o] === l[o] || H(n, o, l[o], u[o], i);
}
function $(n, l, u) {
    "-" === l[0] ? n.setProperty(l, u) : n[l] = null == u ? "" : "number" != typeof u || c.test(l) ? u : u + "px";
}
function H(n, l, u, i, t) {
    var o;
    n: if ("style" === l) if ("string" == typeof u) n.style.cssText = u;
    else {
        if ("string" == typeof i && (n.style.cssText = i = ""), i) for(l in i)u && l in u || $(n.style, l, "");
        if (u) for(l in u)i && u[l] === i[l] || $(n.style, l, u[l]);
    }
    else if ("o" === l[0] && "n" === l[1]) o = l !== (l = l.replace(/Capture$/, "")), l = l.toLowerCase() in n ? l.toLowerCase().slice(2) : l.slice(2), n.l || (n.l = {}), n.l[l + o] = u, u ? i || n.addEventListener(l, o ? T : I, o) : n.removeEventListener(l, o ? T : I, o);
    else if ("dangerouslySetInnerHTML" !== l) {
        if (t) l = l.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
        else if ("href" !== l && "list" !== l && "form" !== l && "tabIndex" !== l && "download" !== l && l in n) try {
            n[l] = null == u ? "" : u;
            break n;
        } catch (n) {}
        "function" == typeof u || (null == u || !1 === u && -1 == l.indexOf("-") ? n.removeAttribute(l) : n.setAttribute(l, u));
    }
}
function I(n) {
    this.l[n.type + !1](l.event ? l.event(n) : n);
}
function T(n) {
    this.l[n.type + !0](l.event ? l.event(n) : n);
}
function j(n, u, i, t, o, r, f, e, c) {
    var a, h, v, y, _, k, b, g, m, x, A, C, $, H, I, T = u.type;
    if (void 0 !== u.constructor) return null;
    null != i.__h && (c = i.__h, e = u.__e = i.__e, u.__h = null, r = [
        e
    ]), (a = l.__b) && a(u);
    try {
        n: if ("function" == typeof T) {
            if (g = u.props, m = (a = T.contextType) && t[a.__c], x = a ? m ? m.props.value : a.__ : t, i.__c ? b = (h = u.__c = i.__c).__ = h.__E : ("prototype" in T && T.prototype.render ? u.__c = h = new T(g, x) : (u.__c = h = new d(g, x), h.constructor = T, h.render = O), m && m.sub(h), h.props = g, h.state || (h.state = {}), h.context = x, h.__n = t, v = h.__d = !0, h.__h = [], h._sb = []), null == h.__s && (h.__s = h.state), null != T.getDerivedStateFromProps && (h.__s == h.state && (h.__s = s({}, h.__s)), s(h.__s, T.getDerivedStateFromProps(g, h.__s))), y = h.props, _ = h.state, v) null == T.getDerivedStateFromProps && null != h.componentWillMount && h.componentWillMount(), null != h.componentDidMount && h.__h.push(h.componentDidMount);
            else {
                if (null == T.getDerivedStateFromProps && g !== y && null != h.componentWillReceiveProps && h.componentWillReceiveProps(g, x), !h.__e && null != h.shouldComponentUpdate && !1 === h.shouldComponentUpdate(g, h.__s, x) || u.__v === i.__v) {
                    for(h.props = g, h.state = h.__s, u.__v !== i.__v && (h.__d = !1), h.__v = u, u.__e = i.__e, u.__k = i.__k, u.__k.forEach(function(n) {
                        n && (n.__ = u);
                    }), A = 0; A < h._sb.length; A++)h.__h.push(h._sb[A]);
                    h._sb = [], h.__h.length && f.push(h);
                    break n;
                }
                null != h.componentWillUpdate && h.componentWillUpdate(g, h.__s, x), null != h.componentDidUpdate && h.__h.push(function() {
                    h.componentDidUpdate(y, _, k);
                });
            }
            if (h.context = x, h.props = g, h.__v = u, h.__P = n, C = l.__r, $ = 0, "prototype" in T && T.prototype.render) {
                for(h.state = h.__s, h.__d = !1, C && C(u), a = h.render(h.props, h.state, h.context), H = 0; H < h._sb.length; H++)h.__h.push(h._sb[H]);
                h._sb = [];
            } else do {
                h.__d = !1, C && C(u), a = h.render(h.props, h.state, h.context), h.state = h.__s;
            }while (h.__d && ++$ < 25)
            h.state = h.__s, null != h.getChildContext && (t = s(s({}, t), h.getChildContext())), v || null == h.getSnapshotBeforeUpdate || (k = h.getSnapshotBeforeUpdate(y, _)), I = null != a && a.type === p && null == a.key ? a.props.children : a, w(n, Array.isArray(I) ? I : [
                I
            ], u, i, t, o, r, f, e, c), h.base = u.__e, u.__h = null, h.__h.length && f.push(h), b && (h.__E = h.__ = null), h.__e = !1;
        } else null == r && u.__v === i.__v ? (u.__k = i.__k, u.__e = i.__e) : u.__e = L(i.__e, u, i, t, o, r, f, c);
        (a = l.diffed) && a(u);
    } catch (n) {
        u.__v = null, (c || null != r) && (u.__e = e, u.__h = !!c, r[r.indexOf(e)] = null), l.__e(n, u, i);
    }
}
function z(n, u) {
    l.__c && l.__c(u, n), n.some(function(u) {
        try {
            n = u.__h, u.__h = [], n.some(function(n) {
                n.call(u);
            });
        } catch (n) {
            l.__e(n, u.__v);
        }
    });
}
function L(l, u, i, t, o, r, e, c) {
    var s, h, v, y = i.props, p = u.props, d = u.type, k = 0;
    if ("svg" === d && (o = !0), null != r) {
        for(; k < r.length; k++)if ((s = r[k]) && "setAttribute" in s == !!d && (d ? s.localName === d : 3 === s.nodeType)) {
            l = s, r[k] = null;
            break;
        }
    }
    if (null == l) {
        if (null === d) return document.createTextNode(p);
        l = o ? document.createElementNS("http://www.w3.org/2000/svg", d) : document.createElement(d, p.is && p), r = null, c = !1;
    }
    if (null === d) y === p || c && l.data === p || (l.data = p);
    else {
        if (r = r && n.call(l.childNodes), h = (y = i.props || f).dangerouslySetInnerHTML, v = p.dangerouslySetInnerHTML, !c) {
            if (null != r) for(y = {}, k = 0; k < l.attributes.length; k++)y[l.attributes[k].name] = l.attributes[k].value;
            (v || h) && (v && (h && v.__html == h.__html || v.__html === l.innerHTML) || (l.innerHTML = v && v.__html || ""));
        }
        if (C(l, p, y, o, c), v) u.__k = [];
        else if (k = u.props.children, w(l, Array.isArray(k) ? k : [
            k
        ], u, i, t, o && "foreignObject" !== d, r, e, r ? r[0] : i.__k && _(i, 0), c), null != r) for(k = r.length; k--;)null != r[k] && a(r[k]);
        c || ("value" in p && void 0 !== (k = p.value) && (k !== l.value || "progress" === d && !k || "option" === d && k !== y.value) && H(l, "value", k, y.value, !1), "checked" in p && void 0 !== (k = p.checked) && k !== l.checked && H(l, "checked", k, y.checked, !1));
    }
    return l;
}
function M(n, u, i) {
    try {
        "function" == typeof n ? n(u) : n.current = u;
    } catch (n) {
        l.__e(n, i);
    }
}
function N(n, u, i) {
    var t, o;
    if (l.unmount && l.unmount(n), (t = n.ref) && (t.current && t.current !== n.__e || M(t, null, u)), null != (t = n.__c)) {
        if (t.componentWillUnmount) try {
            t.componentWillUnmount();
        } catch (n) {
            l.__e(n, u);
        }
        t.base = t.__P = null, n.__c = void 0;
    }
    if (t = n.__k) for(o = 0; o < t.length; o++)t[o] && N(t[o], u, i || "function" != typeof n.type);
    i || null == n.__e || a(n.__e), n.__ = n.__e = n.__d = void 0;
}
function O(n, l, u) {
    return this.constructor(n, u);
}
function P(u, i, t) {
    var o, r, e;
    l.__ && l.__(u, i), r = (o = "function" == typeof t) ? null : t && t.__k || i.__k, e = [], j(i, u = (!o && t || i).__k = h(p, null, [
        u
    ]), r || f, f, void 0 !== i.ownerSVGElement, !o && t ? [
        t
    ] : r ? null : i.firstChild ? n.call(i.childNodes) : null, e, !o && t ? t : r ? r.__e : i.firstChild, o), z(e, u);
}
function S(n, l) {
    P(n, l, S);
}
function q(l, u, i) {
    var t, o, r, f = s({}, l.props);
    for(r in u)"key" == r ? t = u[r] : "ref" == r ? o = u[r] : f[r] = u[r];
    return arguments.length > 2 && (f.children = arguments.length > 3 ? n.call(arguments, 2) : i), v(l.type, f, t || l.key, o || l.ref, null);
}
function B(n, l) {
    var u = {
        __c: l = "__cC" + r++,
        __: n,
        Consumer: function(n, l) {
            return n.children(l);
        },
        Provider: function(n) {
            var u, i;
            return this.getChildContext || (u = [], (i = {})[l] = this, this.getChildContext = function() {
                return i;
            }, this.shouldComponentUpdate = function(n) {
                this.props.value !== n.value && u.some(b);
            }, this.sub = function(n) {
                u.push(n);
                var l = n.componentWillUnmount;
                n.componentWillUnmount = function() {
                    u.splice(u.indexOf(n), 1), l && l.call(n);
                };
            }), n.children;
        }
    };
    return u.Provider.__ = u.Consumer.contextType = u;
}
n = e.slice, l = {
    __e: function(n, l, u, i) {
        for(var t, o, r; l = l.__;)if ((t = l.__c) && !t.__) try {
            if ((o = t.constructor) && null != o.getDerivedStateFromError && (t.setState(o.getDerivedStateFromError(n)), r = t.__d), null != t.componentDidCatch && (t.componentDidCatch(n, i || {}), r = t.__d), r) return t.__E = t;
        } catch (l) {
            n = l;
        }
        throw n;
    }
}, u = 0, i = function(n) {
    return null != n && void 0 === n.constructor;
}, d.prototype.setState = function(n, l) {
    var u;
    u = null != this.__s && this.__s !== this.state ? this.__s : this.__s = s({}, this.state), "function" == typeof n && (n = n(s({}, u), this.props)), n && s(u, n), null != n && this.__v && (l && this._sb.push(l), b(this));
}, d.prototype.forceUpdate = function(n) {
    this.__v && (this.__e = !0, n && this.__h.push(n), b(this));
}, d.prototype.render = p, t = [], g.__r = 0, r = 0;
;
 //# sourceMappingURL=preact.module.js.map
}}),
"[project]/node_modules/preact-render-to-string/dist/index.mjs [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__),
    "render": (()=>k),
    "renderToStaticMarkup": (()=>k),
    "renderToString": (()=>k),
    "shallowRender": (()=>b)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$dist$2f$preact$2e$module$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/preact/dist/preact.module.js [middleware] (ecmascript)");
;
var r = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|^--/i, n = /^(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)$/, o = /[\s\n\\/='"\0<>]/, i = /^xlink:?./, a = /["&<]/;
function l(e) {
    if (!1 === a.test(e += "")) return e;
    for(var t = 0, r = 0, n = "", o = ""; r < e.length; r++){
        switch(e.charCodeAt(r)){
            case 34:
                o = "&quot;";
                break;
            case 38:
                o = "&amp;";
                break;
            case 60:
                o = "&lt;";
                break;
            default:
                continue;
        }
        r !== t && (n += e.slice(t, r)), n += o, t = r + 1;
    }
    return r !== t && (n += e.slice(t, r)), n;
}
var s = function(e, t) {
    return String(e).replace(/(\n+)/g, "$1" + (t || "\t"));
}, f = function(e, t, r) {
    return String(e).length > (t || 40) || !r && -1 !== String(e).indexOf("\n") || -1 !== String(e).indexOf("<");
}, c = {}, u = /([A-Z])/g;
function p(e) {
    var t = "";
    for(var n in e){
        var o = e[n];
        null != o && "" !== o && (t && (t += " "), t += "-" == n[0] ? n : c[n] || (c[n] = n.replace(u, "-$1").toLowerCase()), t = "number" == typeof o && !1 === r.test(n) ? t + ": " + o + "px;" : t + ": " + o + ";");
    }
    return t || void 0;
}
function _(e, t) {
    return Array.isArray(t) ? t.reduce(_, e) : null != t && !1 !== t && e.push(t), e;
}
function d() {
    this.__d = !0;
}
function v(e, t) {
    return {
        __v: e,
        context: t,
        props: e.props,
        setState: d,
        forceUpdate: d,
        __d: !0,
        __h: []
    };
}
function h(e, t) {
    var r = e.contextType, n = r && t[r.__c];
    return null != r ? n ? n.props.value : r.__ : t;
}
var g = [];
function y(r, a, c, u, d, m) {
    if (null == r || "boolean" == typeof r) return "";
    if ("object" != typeof r) return l(r);
    var b = c.pretty, x = b && "string" == typeof b ? b : "\t";
    if (Array.isArray(r)) {
        for(var k = "", S = 0; S < r.length; S++)b && S > 0 && (k += "\n"), k += y(r[S], a, c, u, d, m);
        return k;
    }
    var w, C = r.type, O = r.props, j = !1;
    if ("function" == typeof C) {
        if (j = !0, !c.shallow || !u && !1 !== c.renderRootComponent) {
            if (C === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$dist$2f$preact$2e$module$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["Fragment"]) {
                var A = [];
                return _(A, r.props.children), y(A, a, c, !1 !== c.shallowHighOrder, d, m);
            }
            var F, H = r.__c = v(r, a);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$dist$2f$preact$2e$module$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["options"].__b && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$dist$2f$preact$2e$module$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["options"].__b(r);
            var M = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$dist$2f$preact$2e$module$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["options"].__r;
            if (C.prototype && "function" == typeof C.prototype.render) {
                var L = h(C, a);
                (H = r.__c = new C(O, L)).__v = r, H._dirty = H.__d = !0, H.props = O, null == H.state && (H.state = {}), null == H._nextState && null == H.__s && (H._nextState = H.__s = H.state), H.context = L, C.getDerivedStateFromProps ? H.state = Object.assign({}, H.state, C.getDerivedStateFromProps(H.props, H.state)) : H.componentWillMount && (H.componentWillMount(), H.state = H._nextState !== H.state ? H._nextState : H.__s !== H.state ? H.__s : H.state), M && M(r), F = H.render(H.props, H.state, H.context);
            } else for(var T = h(C, a), E = 0; H.__d && E++ < 25;)H.__d = !1, M && M(r), F = C.call(r.__c, O, T);
            return H.getChildContext && (a = Object.assign({}, a, H.getChildContext())), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$dist$2f$preact$2e$module$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["options"].diffed && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$dist$2f$preact$2e$module$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["options"].diffed(r), y(F, a, c, !1 !== c.shallowHighOrder, d, m);
        }
        C = (w = C).displayName || w !== Function && w.name || function(e) {
            var t = (Function.prototype.toString.call(e).match(/^\s*function\s+([^( ]+)/) || "")[1];
            if (!t) {
                for(var r = -1, n = g.length; n--;)if (g[n] === e) {
                    r = n;
                    break;
                }
                r < 0 && (r = g.push(e) - 1), t = "UnnamedComponent" + r;
            }
            return t;
        }(w);
    }
    var $, D, N = "<" + C;
    if (O) {
        var P = Object.keys(O);
        c && !0 === c.sortAttributes && P.sort();
        for(var W = 0; W < P.length; W++){
            var I = P[W], R = O[I];
            if ("children" !== I) {
                if (!o.test(I) && (c && c.allAttributes || "key" !== I && "ref" !== I && "__self" !== I && "__source" !== I)) {
                    if ("defaultValue" === I) I = "value";
                    else if ("defaultChecked" === I) I = "checked";
                    else if ("defaultSelected" === I) I = "selected";
                    else if ("className" === I) {
                        if (void 0 !== O.class) continue;
                        I = "class";
                    } else d && i.test(I) && (I = I.toLowerCase().replace(/^xlink:?/, "xlink:"));
                    if ("htmlFor" === I) {
                        if (O.for) continue;
                        I = "for";
                    }
                    "style" === I && R && "object" == typeof R && (R = p(R)), "a" === I[0] && "r" === I[1] && "boolean" == typeof R && (R = String(R));
                    var U = c.attributeHook && c.attributeHook(I, R, a, c, j);
                    if (U || "" === U) N += U;
                    else if ("dangerouslySetInnerHTML" === I) D = R && R.__html;
                    else if ("textarea" === C && "value" === I) $ = R;
                    else if ((R || 0 === R || "" === R) && "function" != typeof R) {
                        if (!(!0 !== R && "" !== R || (R = I, c && c.xml))) {
                            N = N + " " + I;
                            continue;
                        }
                        if ("value" === I) {
                            if ("select" === C) {
                                m = R;
                                continue;
                            }
                            "option" === C && m == R && void 0 === O.selected && (N += " selected");
                        }
                        N = N + " " + I + '="' + l(R) + '"';
                    }
                }
            } else $ = R;
        }
    }
    if (b) {
        var V = N.replace(/\n\s*/, " ");
        V === N || ~V.indexOf("\n") ? b && ~N.indexOf("\n") && (N += "\n") : N = V;
    }
    if (N += ">", o.test(C)) throw new Error(C + " is not a valid HTML tag name in " + N);
    var q, z = n.test(C) || c.voidElements && c.voidElements.test(C), Z = [];
    if (D) b && f(D) && (D = "\n" + x + s(D, x)), N += D;
    else if (null != $ && _(q = [], $).length) {
        for(var B = b && ~N.indexOf("\n"), G = !1, J = 0; J < q.length; J++){
            var K = q[J];
            if (null != K && !1 !== K) {
                var Q = y(K, a, c, !0, "svg" === C || "foreignObject" !== C && d, m);
                if (b && !B && f(Q) && (B = !0), Q) if (b) {
                    var X = Q.length > 0 && "<" != Q[0];
                    G && X ? Z[Z.length - 1] += Q : Z.push(Q), G = X;
                } else Z.push(Q);
            }
        }
        if (b && B) for(var Y = Z.length; Y--;)Z[Y] = "\n" + x + s(Z[Y], x);
    }
    if (Z.length || D) N += Z.join("");
    else if (c && c.xml) return N.substring(0, N.length - 1) + " />";
    return !z || q || D ? (b && ~N.indexOf("\n") && (N += "\n"), N = N + "</" + C + ">") : N = N.replace(/>$/, " />"), N;
}
var m = {
    shallow: !0
};
k.render = k;
var b = function(e, t) {
    return k(e, t, m);
}, x = [];
function k(e, r, n) {
    r = r || {};
    var o, i = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$dist$2f$preact$2e$module$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["options"].__s;
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$dist$2f$preact$2e$module$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["options"].__s = !0, o = n && (n.pretty || n.voidElements || n.sortAttributes || n.shallow || n.allAttributes || n.xml || n.attributeHook) ? y(e, r, n) : j(e, r, !1, void 0), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$dist$2f$preact$2e$module$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["options"].__c && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$dist$2f$preact$2e$module$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["options"].__c(e, x), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$dist$2f$preact$2e$module$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["options"].__s = i, x.length = 0, o;
}
function S(e, t) {
    return "className" === e ? "class" : "htmlFor" === e ? "for" : "defaultValue" === e ? "value" : "defaultChecked" === e ? "checked" : "defaultSelected" === e ? "selected" : t && i.test(e) ? e.toLowerCase().replace(/^xlink:?/, "xlink:") : e;
}
function w(e, t) {
    return "style" === e && null != t && "object" == typeof t ? p(t) : "a" === e[0] && "r" === e[1] && "boolean" == typeof t ? String(t) : t;
}
var C = Array.isArray, O = Object.assign;
function j(r, i, a, s) {
    if (null == r || !0 === r || !1 === r || "" === r) return "";
    if ("object" != typeof r) return l(r);
    if (C(r)) {
        for(var f = "", c = 0; c < r.length; c++)f += j(r[c], i, a, s);
        return f;
    }
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$dist$2f$preact$2e$module$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["options"].__b && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$dist$2f$preact$2e$module$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["options"].__b(r);
    var u = r.type, p = r.props;
    if ("function" == typeof u) {
        if (u === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$dist$2f$preact$2e$module$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["Fragment"]) return j(r.props.children, i, a, s);
        var _;
        _ = u.prototype && "function" == typeof u.prototype.render ? function(e, r) {
            var n = e.type, o = h(n, r), i = new n(e.props, o);
            e.__c = i, i.__v = e, i.__d = !0, i.props = e.props, null == i.state && (i.state = {}), null == i.__s && (i.__s = i.state), i.context = o, n.getDerivedStateFromProps ? i.state = O({}, i.state, n.getDerivedStateFromProps(i.props, i.state)) : i.componentWillMount && (i.componentWillMount(), i.state = i.__s !== i.state ? i.__s : i.state);
            var a = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$dist$2f$preact$2e$module$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["options"].__r;
            return a && a(e), i.render(i.props, i.state, i.context);
        }(r, i) : function(e, r) {
            var n, o = v(e, r), i = h(e.type, r);
            e.__c = o;
            for(var a = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$dist$2f$preact$2e$module$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["options"].__r, l = 0; o.__d && l++ < 25;)o.__d = !1, a && a(e), n = e.type.call(o, e.props, i);
            return n;
        }(r, i);
        var d = r.__c;
        d.getChildContext && (i = O({}, i, d.getChildContext()));
        var g = j(_, i, a, s);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$dist$2f$preact$2e$module$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["options"].diffed && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$dist$2f$preact$2e$module$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["options"].diffed(r), g;
    }
    var y, m, b = "<";
    if (b += u, p) for(var x in y = p.children, p){
        var k = p[x];
        if (!("key" === x || "ref" === x || "__self" === x || "__source" === x || "children" === x || "className" === x && "class" in p || "htmlFor" === x && "for" in p || o.test(x))) {
            if (k = w(x = S(x, a), k), "dangerouslySetInnerHTML" === x) m = k && k.__html;
            else if ("textarea" === u && "value" === x) y = k;
            else if ((k || 0 === k || "" === k) && "function" != typeof k) {
                if (!0 === k || "" === k) {
                    k = x, b = b + " " + x;
                    continue;
                }
                if ("value" === x) {
                    if ("select" === u) {
                        s = k;
                        continue;
                    }
                    "option" !== u || s != k || "selected" in p || (b += " selected");
                }
                b = b + " " + x + '="' + l(k) + '"';
            }
        }
    }
    var A = b;
    if (b += ">", o.test(u)) throw new Error(u + " is not a valid HTML tag name in " + b);
    var F = "", H = !1;
    if (m) F += m, H = !0;
    else if ("string" == typeof y) F += l(y), H = !0;
    else if (C(y)) for(var M = 0; M < y.length; M++){
        var L = y[M];
        if (null != L && !1 !== L) {
            var T = j(L, i, "svg" === u || "foreignObject" !== u && a, s);
            T && (F += T, H = !0);
        }
    }
    else if (null != y && !1 !== y && !0 !== y) {
        var E = j(y, i, "svg" === u || "foreignObject" !== u && a, s);
        E && (F += E, H = !0);
    }
    if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$dist$2f$preact$2e$module$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["options"].diffed && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$dist$2f$preact$2e$module$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["options"].diffed(r), H) b += F;
    else if (n.test(u)) return A + " />";
    return b + "</" + u + ">";
}
k.shallowRender = b;
const __TURBOPACK__default__export__ = k;
;
 //# sourceMappingURL=index.module.js.map
}}),
"[project]/node_modules/preact/jsx-runtime/dist/jsxRuntime.module.js [middleware] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "jsx": (()=>o),
    "jsxDEV": (()=>o),
    "jsxs": (()=>o)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$dist$2f$preact$2e$module$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/preact/dist/preact.module.js [middleware] (ecmascript)");
;
;
var _ = 0;
function o(o, e, n, t, f) {
    var l, s, u = {};
    for(s in e)"ref" == s ? l = e[s] : u[s] = e[s];
    var a = {
        type: o,
        props: u,
        key: n,
        ref: l,
        __k: null,
        __: null,
        __b: 0,
        __e: null,
        __d: void 0,
        __c: null,
        __h: null,
        constructor: void 0,
        __v: --_,
        __source: f,
        __self: t
    };
    if ("function" == typeof o && (l = o.defaultProps)) for(s in l)void 0 === u[s] && (u[s] = l[s]);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$dist$2f$preact$2e$module$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["options"].vnode && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$dist$2f$preact$2e$module$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["options"].vnode(a), a;
}
;
 //# sourceMappingURL=jsxRuntime.module.js.map
}}),
"[project]/node_modules/preact/jsx-runtime/dist/jsxRuntime.module.js [middleware] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, t: require } = __turbopack_context__;
{
__turbopack_esm__({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$dist$2f$preact$2e$module$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/preact/dist/preact.module.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$jsx$2d$runtime$2f$dist$2f$jsxRuntime$2e$module$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/preact/jsx-runtime/dist/jsxRuntime.module.js [middleware] (ecmascript) <locals>");
}}),
"[project]/node_modules/@auth/core/lib/pages/error.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>ErrorPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$jsx$2d$runtime$2f$dist$2f$jsxRuntime$2e$module$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/preact/jsx-runtime/dist/jsxRuntime.module.js [middleware] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$jsx$2d$runtime$2f$dist$2f$jsxRuntime$2e$module$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/preact/jsx-runtime/dist/jsxRuntime.module.js [middleware] (ecmascript) <locals>");
;
function ErrorPage(props) {
    const { url, error = "default", theme } = props;
    const signinPageUrl = `${url}/signin`;
    const errors = {
        default: {
            status: 200,
            heading: "Error",
            message: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$jsx$2d$runtime$2f$dist$2f$jsxRuntime$2e$module$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__["jsx"])("p", {
                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$jsx$2d$runtime$2f$dist$2f$jsxRuntime$2e$module$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__["jsx"])("a", {
                    className: "site",
                    href: url?.origin,
                    children: url?.host
                })
            })
        },
        Configuration: {
            status: 500,
            heading: "Server error",
            message: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$jsx$2d$runtime$2f$dist$2f$jsxRuntime$2e$module$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__["jsxs"])("div", {
                children: [
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$jsx$2d$runtime$2f$dist$2f$jsxRuntime$2e$module$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__["jsx"])("p", {
                        children: "There is a problem with the server configuration."
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$jsx$2d$runtime$2f$dist$2f$jsxRuntime$2e$module$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__["jsx"])("p", {
                        children: "Check the server logs for more information."
                    })
                ]
            })
        },
        AccessDenied: {
            status: 403,
            heading: "Access Denied",
            message: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$jsx$2d$runtime$2f$dist$2f$jsxRuntime$2e$module$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__["jsxs"])("div", {
                children: [
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$jsx$2d$runtime$2f$dist$2f$jsxRuntime$2e$module$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__["jsx"])("p", {
                        children: "You do not have permission to sign in."
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$jsx$2d$runtime$2f$dist$2f$jsxRuntime$2e$module$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__["jsx"])("p", {
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$jsx$2d$runtime$2f$dist$2f$jsxRuntime$2e$module$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__["jsx"])("a", {
                            className: "button",
                            href: signinPageUrl,
                            children: "Sign in"
                        })
                    })
                ]
            })
        },
        Verification: {
            status: 403,
            heading: "Unable to sign in",
            message: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$jsx$2d$runtime$2f$dist$2f$jsxRuntime$2e$module$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__["jsxs"])("div", {
                children: [
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$jsx$2d$runtime$2f$dist$2f$jsxRuntime$2e$module$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__["jsx"])("p", {
                        children: "The sign in link is no longer valid."
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$jsx$2d$runtime$2f$dist$2f$jsxRuntime$2e$module$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__["jsx"])("p", {
                        children: "It may have been used already or it may have expired."
                    })
                ]
            }),
            signin: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$jsx$2d$runtime$2f$dist$2f$jsxRuntime$2e$module$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__["jsx"])("a", {
                className: "button",
                href: signinPageUrl,
                children: "Sign in"
            })
        }
    };
    const { status, heading, message, signin } = errors[error] ?? errors.default;
    return {
        status,
        html: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$jsx$2d$runtime$2f$dist$2f$jsxRuntime$2e$module$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__["jsxs"])("div", {
            className: "error",
            children: [
                theme?.brandColor && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$jsx$2d$runtime$2f$dist$2f$jsxRuntime$2e$module$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__["jsx"])("style", {
                    dangerouslySetInnerHTML: {
                        __html: `
        :root {
          --brand-color: ${theme?.brandColor}
        }
      `
                    }
                }),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$jsx$2d$runtime$2f$dist$2f$jsxRuntime$2e$module$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__["jsxs"])("div", {
                    className: "card",
                    children: [
                        theme?.logo && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$jsx$2d$runtime$2f$dist$2f$jsxRuntime$2e$module$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__["jsx"])("img", {
                            src: theme?.logo,
                            alt: "Logo",
                            className: "logo"
                        }),
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$jsx$2d$runtime$2f$dist$2f$jsxRuntime$2e$module$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__["jsx"])("h1", {
                            children: heading
                        }),
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$jsx$2d$runtime$2f$dist$2f$jsxRuntime$2e$module$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__["jsx"])("div", {
                            className: "message",
                            children: message
                        }),
                        signin
                    ]
                })
            ]
        })
    };
}
}}),
"[project]/node_modules/@auth/core/lib/utils/webauthn-client.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
//@ts-check
// Declare a SimpleWebAuthnBrowser variable as part of "window"
/** @typedef {"authenticate"} WebAuthnAuthenticate */ /** @typedef {"register"} WebAuthnRegister */ /** @typedef {WebAuthnRegister | WebAuthnAuthenticate} WebAuthnOptionsAction */ /**
 * @template {WebAuthnOptionsAction} T
 * @typedef {T extends WebAuthnAuthenticate ?
 *  { options: import("@simplewebauthn/types").PublicKeyCredentialRequestOptionsJSON; action: "authenticate" } :
 *  T extends WebAuthnRegister ?
 *  { options: import("@simplewebauthn/types").PublicKeyCredentialCreationOptionsJSON; action: "register" } :
 * never
 * } WebAuthnOptionsReturn
 */ /**
 * webauthnScript is the client-side script that handles the webauthn form
 *
 * @param {string} authURL is the URL of the auth API
 * @param {string} providerID is the ID of the webauthn provider
 */ __turbopack_esm__({
    "webauthnScript": (()=>webauthnScript)
});
async function webauthnScript(authURL, providerID) {
    /** @type {typeof import("@simplewebauthn/browser")} */ // @ts-ignore
    const WebAuthnBrowser = window.SimpleWebAuthnBrowser;
    /**
     * Fetch webauthn options from the server
     *
     * @template {WebAuthnOptionsAction} T
     * @param {T | undefined} action action to fetch options for
     * @returns {Promise<WebAuthnOptionsReturn<T> | undefined>}
     */ async function fetchOptions(action) {
        // Create the options URL with the action and query parameters
        const url = new URL(`${authURL}/webauthn-options/${providerID}`);
        if (action) url.searchParams.append("action", action);
        const formFields = getFormFields();
        formFields.forEach((field)=>{
            url.searchParams.append(field.name, field.value);
        });
        const res = await fetch(url);
        if (!res.ok) {
            console.error("Failed to fetch options", res);
            return;
        }
        return res.json();
    }
    /**
     * Get the webauthn form from the page
     *
     * @returns {HTMLFormElement}
     */ function getForm() {
        const formID = `#${providerID}-form`;
        /** @type {HTMLFormElement | null} */ const form = document.querySelector(formID);
        if (!form) throw new Error(`Form '${formID}' not found`);
        return form;
    }
    /**
     * Get formFields from the form
     *
     * @returns {HTMLInputElement[]}
     */ function getFormFields() {
        const form = getForm();
        /** @type {HTMLInputElement[]} */ const formFields = Array.from(form.querySelectorAll("input[data-form-field]"));
        return formFields;
    }
    /**
     * Passkey form submission handler.
     * Takes the input from the form and a few other parameters and submits it to the server.
     *
     * @param {WebAuthnOptionsAction} action action to submit
     * @param {unknown | undefined} data optional data to submit
     * @returns {Promise<void>}
     */ async function submitForm(action, data) {
        const form = getForm();
        // If a POST request, create hidden fields in the form
        // and submit it so the browser redirects on login
        if (action) {
            const actionInput = document.createElement("input");
            actionInput.type = "hidden";
            actionInput.name = "action";
            actionInput.value = action;
            form.appendChild(actionInput);
        }
        if (data) {
            const dataInput = document.createElement("input");
            dataInput.type = "hidden";
            dataInput.name = "data";
            dataInput.value = JSON.stringify(data);
            form.appendChild(dataInput);
        }
        return form.submit();
    }
    /**
     * Executes the authentication flow by fetching options from the server,
     * starting the authentication, and submitting the response to the server.
     *
     * @param {WebAuthnOptionsReturn<WebAuthnAuthenticate>['options']} options
     * @param {boolean} autofill Whether or not to use the browser's autofill
     * @returns {Promise<void>}
     */ async function authenticationFlow(options, autofill) {
        // Start authentication
        const authResp = await WebAuthnBrowser.startAuthentication(options, autofill);
        // Submit authentication response to server
        return await submitForm("authenticate", authResp);
    }
    /**
     * @param {WebAuthnOptionsReturn<WebAuthnRegister>['options']} options
     */ async function registrationFlow(options) {
        // Check if all required formFields are set
        const formFields = getFormFields();
        formFields.forEach((field)=>{
            if (field.required && !field.value) {
                throw new Error(`Missing required field: ${field.name}`);
            }
        });
        // Start registration
        const regResp = await WebAuthnBrowser.startRegistration(options);
        // Submit registration response to server
        return await submitForm("register", regResp);
    }
    /**
     * Attempts to authenticate the user when the page loads
     * using the browser's autofill popup.
     *
     * @returns {Promise<void>}
     */ async function autofillAuthentication() {
        // if the browser can't handle autofill, don't try
        if (!WebAuthnBrowser.browserSupportsWebAuthnAutofill()) return;
        const res = await fetchOptions("authenticate");
        if (!res) {
            console.error("Failed to fetch option for autofill authentication");
            return;
        }
        try {
            await authenticationFlow(res.options, true);
        } catch (e) {
            console.error(e);
        }
    }
    /**
     * Sets up the passkey form by overriding the form submission handler
     * so that it attempts to authenticate the user when the form is submitted.
     * If the user is not registered, it will attempt to register them instead.
     */ async function setupForm() {
        const form = getForm();
        // If the browser can't do WebAuthn, hide the form
        if (!WebAuthnBrowser.browserSupportsWebAuthn()) {
            form.style.display = "none";
            return;
        }
        if (form) {
            form.addEventListener("submit", async (e)=>{
                e.preventDefault();
                // Fetch options from the server without assuming that
                // the user is registered
                const res = await fetchOptions(undefined);
                if (!res) {
                    console.error("Failed to fetch options for form submission");
                    return;
                }
                // Then execute the appropriate flow
                if (res.action === "authenticate") {
                    try {
                        await authenticationFlow(res.options, false);
                    } catch (e) {
                        console.error(e);
                    }
                } else if (res.action === "register") {
                    try {
                        await registrationFlow(res.options);
                    } catch (e) {
                        console.error(e);
                    }
                }
            });
        }
    }
    // On page load, setup the form and attempt to authenticate the user.
    setupForm();
    autofillAuthentication();
}
}}),
"[project]/node_modules/@auth/core/lib/pages/signin.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>SigninPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$jsx$2d$runtime$2f$dist$2f$jsxRuntime$2e$module$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/preact/jsx-runtime/dist/jsxRuntime.module.js [middleware] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$utils$2f$webauthn$2d$client$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@auth/core/lib/utils/webauthn-client.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$jsx$2d$runtime$2f$dist$2f$jsxRuntime$2e$module$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/preact/jsx-runtime/dist/jsxRuntime.module.js [middleware] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$dist$2f$preact$2e$module$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/preact/dist/preact.module.js [middleware] (ecmascript)");
;
;
const signinErrors = {
    default: "Unable to sign in.",
    Signin: "Try signing in with a different account.",
    OAuthSignin: "Try signing in with a different account.",
    OAuthCallbackError: "Try signing in with a different account.",
    OAuthCreateAccount: "Try signing in with a different account.",
    EmailCreateAccount: "Try signing in with a different account.",
    Callback: "Try signing in with a different account.",
    OAuthAccountNotLinked: "To confirm your identity, sign in with the same account you used originally.",
    EmailSignin: "The e-mail could not be sent.",
    CredentialsSignin: "Sign in failed. Check the details you provided are correct.",
    SessionRequired: "Please sign in to access this page."
};
function ConditionalUIScript(providerID) {
    const startConditionalUIScript = `
const currentURL = window.location.href;
const authURL = currentURL.substring(0, currentURL.lastIndexOf('/'));
(${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$utils$2f$webauthn$2d$client$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["webauthnScript"]})(authURL, "${providerID}");
`;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$jsx$2d$runtime$2f$dist$2f$jsxRuntime$2e$module$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$dist$2f$preact$2e$module$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["Fragment"], {
        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$jsx$2d$runtime$2f$dist$2f$jsxRuntime$2e$module$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__["jsx"])("script", {
            dangerouslySetInnerHTML: {
                __html: startConditionalUIScript
            }
        })
    });
}
function SigninPage(props) {
    const { csrfToken, providers = [], callbackUrl, theme, email, error: errorType } = props;
    if (typeof document !== "undefined" && theme?.brandColor) {
        document.documentElement.style.setProperty("--brand-color", theme.brandColor);
    }
    if (typeof document !== "undefined" && theme?.buttonText) {
        document.documentElement.style.setProperty("--button-text-color", theme.buttonText);
    }
    const error = errorType && (signinErrors[errorType] ?? signinErrors.default);
    const providerLogoPath = "https://authjs.dev/img/providers";
    const conditionalUIProviderID = providers.find((provider)=>provider.type === "webauthn" && provider.enableConditionalUI)?.id;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$jsx$2d$runtime$2f$dist$2f$jsxRuntime$2e$module$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__["jsxs"])("div", {
        className: "signin",
        children: [
            theme?.brandColor && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$jsx$2d$runtime$2f$dist$2f$jsxRuntime$2e$module$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__["jsx"])("style", {
                dangerouslySetInnerHTML: {
                    __html: `:root {--brand-color: ${theme.brandColor}}`
                }
            }),
            theme?.buttonText && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$jsx$2d$runtime$2f$dist$2f$jsxRuntime$2e$module$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__["jsx"])("style", {
                dangerouslySetInnerHTML: {
                    __html: `
        :root {
          --button-text-color: ${theme.buttonText}
        }
      `
                }
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$jsx$2d$runtime$2f$dist$2f$jsxRuntime$2e$module$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__["jsxs"])("div", {
                className: "card",
                children: [
                    error && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$jsx$2d$runtime$2f$dist$2f$jsxRuntime$2e$module$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__["jsx"])("div", {
                        className: "error",
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$jsx$2d$runtime$2f$dist$2f$jsxRuntime$2e$module$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__["jsx"])("p", {
                            children: error
                        })
                    }),
                    theme?.logo && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$jsx$2d$runtime$2f$dist$2f$jsxRuntime$2e$module$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__["jsx"])("img", {
                        src: theme.logo,
                        alt: "Logo",
                        className: "logo"
                    }),
                    providers.map((provider, i)=>{
                        let bg, brandColor, logo;
                        if (provider.type === "oauth" || provider.type === "oidc") {
                            ;
                            ({ bg = "#fff", brandColor, logo = `${providerLogoPath}/${provider.id}.svg` } = provider.style ?? {});
                        }
                        const color = brandColor ?? bg ?? "#fff";
                        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$jsx$2d$runtime$2f$dist$2f$jsxRuntime$2e$module$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__["jsxs"])("div", {
                            className: "provider",
                            children: [
                                provider.type === "oauth" || provider.type === "oidc" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$jsx$2d$runtime$2f$dist$2f$jsxRuntime$2e$module$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__["jsxs"])("form", {
                                    action: provider.signinUrl,
                                    method: "POST",
                                    children: [
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$jsx$2d$runtime$2f$dist$2f$jsxRuntime$2e$module$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__["jsx"])("input", {
                                            type: "hidden",
                                            name: "csrfToken",
                                            value: csrfToken
                                        }),
                                        callbackUrl && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$jsx$2d$runtime$2f$dist$2f$jsxRuntime$2e$module$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__["jsx"])("input", {
                                            type: "hidden",
                                            name: "callbackUrl",
                                            value: callbackUrl
                                        }),
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$jsx$2d$runtime$2f$dist$2f$jsxRuntime$2e$module$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__["jsxs"])("button", {
                                            type: "submit",
                                            className: "button",
                                            style: {
                                                "--provider-bg": "#fff",
                                                "--provider-bg-hover": `color-mix(in srgb, ${color} 30%, #fff)`,
                                                "--provider-dark-bg": "#161b22",
                                                "--provider-dark-bg-hover": `color-mix(in srgb, ${color} 30%, #000)`
                                            },
                                            tabIndex: 0,
                                            children: [
                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$jsx$2d$runtime$2f$dist$2f$jsxRuntime$2e$module$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__["jsxs"])("span", {
                                                    style: {
                                                        filter: "invert(1) grayscale(1) brightness(1.3) contrast(9000)",
                                                        "mix-blend-mode": "luminosity",
                                                        opacity: 0.95
                                                    },
                                                    children: [
                                                        "Sign in with ",
                                                        provider.name
                                                    ]
                                                }),
                                                logo && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$jsx$2d$runtime$2f$dist$2f$jsxRuntime$2e$module$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__["jsx"])("img", {
                                                    loading: "lazy",
                                                    height: 24,
                                                    src: logo
                                                })
                                            ]
                                        })
                                    ]
                                }) : null,
                                (provider.type === "email" || provider.type === "credentials" || provider.type === "webauthn") && i > 0 && providers[i - 1].type !== "email" && providers[i - 1].type !== "credentials" && providers[i - 1].type !== "webauthn" && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$jsx$2d$runtime$2f$dist$2f$jsxRuntime$2e$module$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__["jsx"])("hr", {}),
                                provider.type === "email" && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$jsx$2d$runtime$2f$dist$2f$jsxRuntime$2e$module$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__["jsxs"])("form", {
                                    action: provider.signinUrl,
                                    method: "POST",
                                    children: [
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$jsx$2d$runtime$2f$dist$2f$jsxRuntime$2e$module$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__["jsx"])("input", {
                                            type: "hidden",
                                            name: "csrfToken",
                                            value: csrfToken
                                        }),
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$jsx$2d$runtime$2f$dist$2f$jsxRuntime$2e$module$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__["jsx"])("label", {
                                            className: "section-header",
                                            htmlFor: `input-email-for-${provider.id}-provider`,
                                            children: "Email"
                                        }),
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$jsx$2d$runtime$2f$dist$2f$jsxRuntime$2e$module$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__["jsx"])("input", {
                                            id: `input-email-for-${provider.id}-provider`,
                                            autoFocus: true,
                                            type: "email",
                                            name: "email",
                                            value: email,
                                            placeholder: "email@example.com",
                                            required: true
                                        }),
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$jsx$2d$runtime$2f$dist$2f$jsxRuntime$2e$module$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__["jsxs"])("button", {
                                            id: "submitButton",
                                            type: "submit",
                                            tabIndex: 0,
                                            children: [
                                                "Sign in with ",
                                                provider.name
                                            ]
                                        })
                                    ]
                                }),
                                provider.type === "credentials" && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$jsx$2d$runtime$2f$dist$2f$jsxRuntime$2e$module$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__["jsxs"])("form", {
                                    action: provider.callbackUrl,
                                    method: "POST",
                                    children: [
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$jsx$2d$runtime$2f$dist$2f$jsxRuntime$2e$module$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__["jsx"])("input", {
                                            type: "hidden",
                                            name: "csrfToken",
                                            value: csrfToken
                                        }),
                                        Object.keys(provider.credentials).map((credential)=>{
                                            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$jsx$2d$runtime$2f$dist$2f$jsxRuntime$2e$module$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__["jsxs"])("div", {
                                                children: [
                                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$jsx$2d$runtime$2f$dist$2f$jsxRuntime$2e$module$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__["jsx"])("label", {
                                                        className: "section-header",
                                                        htmlFor: `input-${credential}-for-${provider.id}-provider`,
                                                        children: provider.credentials[credential].label ?? credential
                                                    }),
                                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$jsx$2d$runtime$2f$dist$2f$jsxRuntime$2e$module$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__["jsx"])("input", {
                                                        name: credential,
                                                        id: `input-${credential}-for-${provider.id}-provider`,
                                                        type: provider.credentials[credential].type ?? "text",
                                                        placeholder: provider.credentials[credential].placeholder ?? "",
                                                        ...provider.credentials[credential]
                                                    })
                                                ]
                                            }, `input-group-${provider.id}`);
                                        }),
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$jsx$2d$runtime$2f$dist$2f$jsxRuntime$2e$module$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__["jsxs"])("button", {
                                            id: "submitButton",
                                            type: "submit",
                                            tabIndex: 0,
                                            children: [
                                                "Sign in with ",
                                                provider.name
                                            ]
                                        })
                                    ]
                                }),
                                provider.type === "webauthn" && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$jsx$2d$runtime$2f$dist$2f$jsxRuntime$2e$module$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__["jsxs"])("form", {
                                    action: provider.callbackUrl,
                                    method: "POST",
                                    id: `${provider.id}-form`,
                                    children: [
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$jsx$2d$runtime$2f$dist$2f$jsxRuntime$2e$module$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__["jsx"])("input", {
                                            type: "hidden",
                                            name: "csrfToken",
                                            value: csrfToken
                                        }),
                                        Object.keys(provider.formFields).map((field)=>{
                                            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$jsx$2d$runtime$2f$dist$2f$jsxRuntime$2e$module$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__["jsxs"])("div", {
                                                children: [
                                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$jsx$2d$runtime$2f$dist$2f$jsxRuntime$2e$module$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__["jsx"])("label", {
                                                        className: "section-header",
                                                        htmlFor: `input-${field}-for-${provider.id}-provider`,
                                                        children: provider.formFields[field].label ?? field
                                                    }),
                                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$jsx$2d$runtime$2f$dist$2f$jsxRuntime$2e$module$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__["jsx"])("input", {
                                                        name: field,
                                                        "data-form-field": true,
                                                        id: `input-${field}-for-${provider.id}-provider`,
                                                        type: provider.formFields[field].type ?? "text",
                                                        placeholder: provider.formFields[field].placeholder ?? "",
                                                        ...provider.formFields[field]
                                                    })
                                                ]
                                            }, `input-group-${provider.id}`);
                                        }),
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$jsx$2d$runtime$2f$dist$2f$jsxRuntime$2e$module$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__["jsxs"])("button", {
                                            id: `submitButton-${provider.id}`,
                                            type: "submit",
                                            tabIndex: 0,
                                            children: [
                                                "Sign in with ",
                                                provider.name
                                            ]
                                        })
                                    ]
                                }),
                                (provider.type === "email" || provider.type === "credentials" || provider.type === "webauthn") && i + 1 < providers.length && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$jsx$2d$runtime$2f$dist$2f$jsxRuntime$2e$module$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__["jsx"])("hr", {})
                            ]
                        }, provider.id);
                    })
                ]
            }),
            conditionalUIProviderID && ConditionalUIScript(conditionalUIProviderID)
        ]
    });
}
}}),
"[project]/node_modules/@auth/core/lib/pages/signout.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>SignoutPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$jsx$2d$runtime$2f$dist$2f$jsxRuntime$2e$module$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/preact/jsx-runtime/dist/jsxRuntime.module.js [middleware] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$jsx$2d$runtime$2f$dist$2f$jsxRuntime$2e$module$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/preact/jsx-runtime/dist/jsxRuntime.module.js [middleware] (ecmascript) <locals>");
;
function SignoutPage(props) {
    const { url, csrfToken, theme } = props;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$jsx$2d$runtime$2f$dist$2f$jsxRuntime$2e$module$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__["jsxs"])("div", {
        className: "signout",
        children: [
            theme?.brandColor && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$jsx$2d$runtime$2f$dist$2f$jsxRuntime$2e$module$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__["jsx"])("style", {
                dangerouslySetInnerHTML: {
                    __html: `
        :root {
          --brand-color: ${theme.brandColor}
        }
      `
                }
            }),
            theme?.buttonText && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$jsx$2d$runtime$2f$dist$2f$jsxRuntime$2e$module$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__["jsx"])("style", {
                dangerouslySetInnerHTML: {
                    __html: `
        :root {
          --button-text-color: ${theme.buttonText}
        }
      `
                }
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$jsx$2d$runtime$2f$dist$2f$jsxRuntime$2e$module$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__["jsxs"])("div", {
                className: "card",
                children: [
                    theme?.logo && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$jsx$2d$runtime$2f$dist$2f$jsxRuntime$2e$module$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__["jsx"])("img", {
                        src: theme.logo,
                        alt: "Logo",
                        className: "logo"
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$jsx$2d$runtime$2f$dist$2f$jsxRuntime$2e$module$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__["jsx"])("h1", {
                        children: "Signout"
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$jsx$2d$runtime$2f$dist$2f$jsxRuntime$2e$module$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__["jsx"])("p", {
                        children: "Are you sure you want to sign out?"
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$jsx$2d$runtime$2f$dist$2f$jsxRuntime$2e$module$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__["jsxs"])("form", {
                        action: url?.toString(),
                        method: "POST",
                        children: [
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$jsx$2d$runtime$2f$dist$2f$jsxRuntime$2e$module$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__["jsx"])("input", {
                                type: "hidden",
                                name: "csrfToken",
                                value: csrfToken
                            }),
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$jsx$2d$runtime$2f$dist$2f$jsxRuntime$2e$module$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__["jsx"])("button", {
                                id: "submitButton",
                                type: "submit",
                                children: "Sign out"
                            })
                        ]
                    })
                ]
            })
        ]
    });
}
}}),
"[project]/node_modules/@auth/core/lib/pages/styles.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
// Generated by `pnpm css`
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
const __TURBOPACK__default__export__ = `:root {
  --border-width: 1px;
  --border-radius: 0.5rem;
  --color-error: #c94b4b;
  --color-info: #157efb;
  --color-info-hover: #0f6ddb;
  --color-info-text: #fff;
}

.__next-auth-theme-auto,
.__next-auth-theme-light {
  --color-background: #ececec;
  --color-background-hover: rgba(236, 236, 236, 0.8);
  --color-background-card: #fff;
  --color-text: #000;
  --color-primary: #444;
  --color-control-border: #bbb;
  --color-button-active-background: #f9f9f9;
  --color-button-active-border: #aaa;
  --color-separator: #ccc;
}

.__next-auth-theme-dark {
  --color-background: #161b22;
  --color-background-hover: rgba(22, 27, 34, 0.8);
  --color-background-card: #0d1117;
  --color-text: #fff;
  --color-primary: #ccc;
  --color-control-border: #555;
  --color-button-active-background: #060606;
  --color-button-active-border: #666;
  --color-separator: #444;
}

@media (prefers-color-scheme: dark) {
  .__next-auth-theme-auto {
    --color-background: #161b22;
    --color-background-hover: rgba(22, 27, 34, 0.8);
    --color-background-card: #0d1117;
    --color-text: #fff;
    --color-primary: #ccc;
    --color-control-border: #555;
    --color-button-active-background: #060606;
    --color-button-active-border: #666;
    --color-separator: #444;
  }

  button,
  a.button {
    color: var(--provider-dark-color, var(--color-primary)) !important;
    background-color: var(
      --provider-dark-bg,
      var(--color-background)
    ) !important;
  }

    :is(button,a.button):hover {
      background-color: var(
        --provider-dark-bg-hover,
        var(--color-background-hover)
      ) !important;
    }

    :is(button,a.button) span {
      color: var(--provider-dark-bg) !important;
    }
}

html {
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: inherit;
  margin: 0;
  padding: 0;
}

body {
  background-color: var(--color-background);
  margin: 0;
  padding: 0;
  font-family:
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Roboto,
    "Helvetica Neue",
    Arial,
    "Noto Sans",
    sans-serif,
    "Apple Color Emoji",
    "Segoe UI Emoji",
    "Segoe UI Symbol",
    "Noto Color Emoji";
}

h1 {
  margin-bottom: 1.5rem;
  padding: 0 1rem;
  font-weight: 400;
  color: var(--color-text);
}

p {
  margin-bottom: 1.5rem;
  padding: 0 1rem;
  color: var(--color-text);
}

form {
  margin: 0;
  padding: 0;
}

label {
  font-weight: 500;
  text-align: left;
  margin-bottom: 0.25rem;
  display: block;
  color: var(--color-text);
}

input[type] {
  box-sizing: border-box;
  display: block;
  width: 100%;
  padding: 0.5rem 1rem;
  border: var(--border-width) solid var(--color-control-border);
  background: var(--color-background-card);
  font-size: 1rem;
  border-radius: var(--border-radius);
  color: var(--color-text);
}

p {
  font-size: 1.1rem;
  line-height: 2rem;
}

a.button {
  text-decoration: none;
  line-height: 1rem;
}

a.button:link,
  a.button:visited {
    background-color: var(--color-background);
    color: var(--color-primary);
  }

button,
a.button {
  padding: 0.75rem 1rem;
  color: var(--provider-color, var(--color-primary));
  background-color: var(--provider-bg, var(--color-background));
  border: 1px solid #00000031;
  font-size: 0.9rem;
  height: 50px;
  border-radius: var(--border-radius);
  transition: background-color 250ms ease-in-out;
  font-weight: 300;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

:is(button,a.button):hover {
    background-color: var(--provider-bg-hover, var(--color-background-hover));
    cursor: pointer;
  }

:is(button,a.button):active {
    cursor: pointer;
  }

:is(button,a.button) span {
    color: #fff;
  }

#submitButton {
  color: var(--button-text-color, var(--color-info-text));
  background-color: var(--brand-color, var(--color-info));
  width: 100%;
}

#submitButton:hover {
    background-color: var(
      --button-hover-bg,
      var(--color-info-hover)
    ) !important;
  }

a.site {
  color: var(--color-primary);
  text-decoration: none;
  font-size: 1rem;
  line-height: 2rem;
}

a.site:hover {
    text-decoration: underline;
  }

.page {
  position: absolute;
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.page > div {
    text-align: center;
  }

.error a.button {
    padding-left: 2rem;
    padding-right: 2rem;
    margin-top: 0.5rem;
  }

.error .message {
    margin-bottom: 1.5rem;
  }

.signin input[type="text"] {
    margin-left: auto;
    margin-right: auto;
    display: block;
  }

.signin hr {
    display: block;
    border: 0;
    border-top: 1px solid var(--color-separator);
    margin: 2rem auto 1rem auto;
    overflow: visible;
  }

.signin hr::before {
      content: "or";
      background: var(--color-background-card);
      color: #888;
      padding: 0 0.4rem;
      position: relative;
      top: -0.7rem;
    }

.signin .error {
    background: #f5f5f5;
    font-weight: 500;
    border-radius: 0.3rem;
    background: var(--color-error);
  }

.signin .error p {
      text-align: left;
      padding: 0.5rem 1rem;
      font-size: 0.9rem;
      line-height: 1.2rem;
      color: var(--color-info-text);
    }

.signin > div,
  .signin form {
    display: block;
  }

.signin > div input[type], .signin form input[type] {
      margin-bottom: 0.5rem;
    }

.signin > div button, .signin form button {
      width: 100%;
    }

.signin .provider + .provider {
    margin-top: 1rem;
  }

.logo {
  display: inline-block;
  max-width: 150px;
  margin: 1.25rem 0;
  max-height: 70px;
}

.card {
  background-color: var(--color-background-card);
  border-radius: 1rem;
  padding: 1.25rem 2rem;
}

.card .header {
    color: var(--color-primary);
  }

.card input[type]::-moz-placeholder {
    color: color-mix(
      in srgb,
      var(--color-text) 20%,
      var(--color-button-active-background)
    );
  }

.card input[type]::placeholder {
    color: color-mix(
      in srgb,
      var(--color-text) 20%,
      var(--color-button-active-background)
    );
  }

.card input[type] {
    background: color-mix(in srgb, var(--color-background-card) 95%, black);
  }

.section-header {
  color: var(--color-text);
}

@media screen and (min-width: 450px) {
  .card {
    margin: 2rem 0;
    width: 368px;
  }
}

@media screen and (max-width: 450px) {
  .card {
    margin: 1rem 0;
    width: 343px;
  }
}
`;
}}),
"[project]/node_modules/@auth/core/lib/pages/verify-request.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>VerifyRequestPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$jsx$2d$runtime$2f$dist$2f$jsxRuntime$2e$module$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/preact/jsx-runtime/dist/jsxRuntime.module.js [middleware] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$jsx$2d$runtime$2f$dist$2f$jsxRuntime$2e$module$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/preact/jsx-runtime/dist/jsxRuntime.module.js [middleware] (ecmascript) <locals>");
;
function VerifyRequestPage(props) {
    const { url, theme } = props;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$jsx$2d$runtime$2f$dist$2f$jsxRuntime$2e$module$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__["jsxs"])("div", {
        className: "verify-request",
        children: [
            theme.brandColor && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$jsx$2d$runtime$2f$dist$2f$jsxRuntime$2e$module$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__["jsx"])("style", {
                dangerouslySetInnerHTML: {
                    __html: `
        :root {
          --brand-color: ${theme.brandColor}
        }
      `
                }
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$jsx$2d$runtime$2f$dist$2f$jsxRuntime$2e$module$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__["jsxs"])("div", {
                className: "card",
                children: [
                    theme.logo && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$jsx$2d$runtime$2f$dist$2f$jsxRuntime$2e$module$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__["jsx"])("img", {
                        src: theme.logo,
                        alt: "Logo",
                        className: "logo"
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$jsx$2d$runtime$2f$dist$2f$jsxRuntime$2e$module$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__["jsx"])("h1", {
                        children: "Check your email"
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$jsx$2d$runtime$2f$dist$2f$jsxRuntime$2e$module$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__["jsx"])("p", {
                        children: "A sign in link has been sent to your email address."
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$jsx$2d$runtime$2f$dist$2f$jsxRuntime$2e$module$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__["jsx"])("p", {
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$jsx$2d$runtime$2f$dist$2f$jsxRuntime$2e$module$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__["jsx"])("a", {
                            className: "site",
                            href: url.origin,
                            children: url.host
                        })
                    })
                ]
            })
        ]
    });
}
}}),
"[project]/node_modules/@auth/core/lib/pages/index.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>renderPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2d$render$2d$to$2d$string$2f$dist$2f$index$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/preact-render-to-string/dist/index.mjs [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$pages$2f$error$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@auth/core/lib/pages/error.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$pages$2f$signin$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@auth/core/lib/pages/signin.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$pages$2f$signout$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@auth/core/lib/pages/signout.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$pages$2f$styles$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@auth/core/lib/pages/styles.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$pages$2f$verify$2d$request$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@auth/core/lib/pages/verify-request.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@auth/core/errors.js [middleware] (ecmascript)");
;
;
;
;
;
;
;
function send({ html, title, status, cookies, theme, headTags }) {
    return {
        cookies,
        status,
        headers: {
            "Content-Type": "text/html"
        },
        body: `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0"><style>${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$pages$2f$styles$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"]}</style><title>${title}</title>${headTags ?? ""}</head><body class="__next-auth-theme-${theme?.colorScheme ?? "auto"}"><div class="page">${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2d$render$2d$to$2d$string$2f$dist$2f$index$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__["renderToString"])(html)}</div></body></html>`
    };
}
function renderPage(params) {
    const { url, theme, query, cookies, pages, providers } = params;
    return {
        csrf (skip, options, cookies) {
            if (!skip) {
                return {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: {
                        csrfToken: options.csrfToken
                    },
                    cookies
                };
            }
            options.logger.warn("csrf-disabled");
            cookies.push({
                name: options.cookies.csrfToken.name,
                value: "",
                options: {
                    ...options.cookies.csrfToken.options,
                    maxAge: 0
                }
            });
            return {
                status: 404,
                cookies
            };
        },
        providers (providers) {
            return {
                headers: {
                    "Content-Type": "application/json"
                },
                body: providers.reduce((acc, { id, name, type, signinUrl, callbackUrl })=>{
                    acc[id] = {
                        id,
                        name,
                        type,
                        signinUrl,
                        callbackUrl
                    };
                    return acc;
                }, {})
            };
        },
        signin (providerId, error) {
            if (providerId) throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["UnknownAction"]("Unsupported action");
            if (pages?.signIn) {
                let signinUrl = `${pages.signIn}${pages.signIn.includes("?") ? "&" : "?"}${new URLSearchParams({
                    callbackUrl: params.callbackUrl ?? "/"
                })}`;
                if (error) signinUrl = `${signinUrl}&${new URLSearchParams({
                    error
                })}`;
                return {
                    redirect: signinUrl,
                    cookies
                };
            }
            // If we have a webauthn provider with conditional UI and
            // a simpleWebAuthnBrowserScript is defined, we need to
            // render the script in the page.
            const webauthnProvider = providers?.find((p)=>p.type === "webauthn" && p.enableConditionalUI && !!p.simpleWebAuthnBrowserVersion);
            let simpleWebAuthnBrowserScript = "";
            if (webauthnProvider) {
                const { simpleWebAuthnBrowserVersion } = webauthnProvider;
                simpleWebAuthnBrowserScript = `<script src="https://unpkg.com/@simplewebauthn/browser@${simpleWebAuthnBrowserVersion}/dist/bundle/index.umd.min.js" crossorigin="anonymous"></script>`;
            }
            return send({
                cookies,
                theme,
                html: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$pages$2f$signin$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"])({
                    csrfToken: params.csrfToken,
                    // We only want to render providers
                    providers: params.providers?.filter((provider)=>// Always render oauth and email type providers
                        [
                            "email",
                            "oauth",
                            "oidc"
                        ].includes(provider.type) || provider.type === "credentials" && provider.credentials || provider.type === "webauthn" && provider.formFields || // Don't render other provider types
                        false),
                    callbackUrl: params.callbackUrl,
                    theme: params.theme,
                    error,
                    ...query
                }),
                title: "Sign In",
                headTags: simpleWebAuthnBrowserScript
            });
        },
        signout () {
            if (pages?.signOut) return {
                redirect: pages.signOut,
                cookies
            };
            return send({
                cookies,
                theme,
                html: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$pages$2f$signout$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"])({
                    csrfToken: params.csrfToken,
                    url,
                    theme
                }),
                title: "Sign Out"
            });
        },
        verifyRequest (props) {
            if (pages?.verifyRequest) return {
                redirect: pages.verifyRequest,
                cookies
            };
            return send({
                cookies,
                theme,
                html: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$pages$2f$verify$2d$request$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"])({
                    url,
                    theme,
                    ...props
                }),
                title: "Verify Request"
            });
        },
        error (error) {
            if (pages?.error) {
                return {
                    redirect: `${pages.error}${pages.error.includes("?") ? "&" : "?"}error=${error}`,
                    cookies
                };
            }
            return send({
                cookies,
                theme,
                // @ts-expect-error fix error type
                ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$pages$2f$error$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"])({
                    url,
                    theme,
                    error
                }),
                title: "Error"
            });
        }
    };
}
}}),
"[project]/node_modules/@auth/core/lib/utils/date.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
/**
 * Takes a number in seconds and returns the date in the future.
 * Optionally takes a second date parameter. In that case
 * the date in the future will be calculated from that date instead of now.
 */ __turbopack_esm__({
    "fromDate": (()=>fromDate)
});
function fromDate(time, date = Date.now()) {
    return new Date(date + time * 1000);
}
}}),
"[project]/node_modules/@auth/core/lib/actions/callback/handle-login.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "handleLoginOrRegister": (()=>handleLoginOrRegister)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@auth/core/errors.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$utils$2f$date$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@auth/core/lib/utils/date.js [middleware] (ecmascript)");
;
;
async function handleLoginOrRegister(sessionToken, _profile, _account, options) {
    // Input validation
    if (!_account?.providerAccountId || !_account.type) throw new Error("Missing or invalid provider account");
    if (![
        "email",
        "oauth",
        "oidc",
        "webauthn"
    ].includes(_account.type)) throw new Error("Provider not supported");
    const { adapter, jwt, events, session: { strategy: sessionStrategy, generateSessionToken } } = options;
    // If no adapter is configured then we don't have a database and cannot
    // persist data; in this mode we just return a dummy session object.
    if (!adapter) {
        return {
            user: _profile,
            account: _account
        };
    }
    const profile = _profile;
    let account = _account;
    const { createUser, updateUser, getUser, getUserByAccount, getUserByEmail, linkAccount, createSession, getSessionAndUser, deleteSession } = adapter;
    let session = null;
    let user = null;
    let isNewUser = false;
    const useJwtSession = sessionStrategy === "jwt";
    if (sessionToken) {
        if (useJwtSession) {
            try {
                const salt = options.cookies.sessionToken.name;
                session = await jwt.decode({
                    ...jwt,
                    token: sessionToken,
                    salt
                });
                if (session && "sub" in session && session.sub) {
                    user = await getUser(session.sub);
                }
            } catch  {
            // If session can't be verified, treat as no session
            }
        } else {
            const userAndSession = await getSessionAndUser(sessionToken);
            if (userAndSession) {
                session = userAndSession.session;
                user = userAndSession.user;
            }
        }
    }
    if (account.type === "email") {
        // If signing in with an email, check if an account with the same email address exists already
        const userByEmail = await getUserByEmail(profile.email);
        if (userByEmail) {
            // If they are not already signed in as the same user, this flow will
            // sign them out of the current session and sign them in as the new user
            if (user?.id !== userByEmail.id && !useJwtSession && sessionToken) {
                // Delete existing session if they are currently signed in as another user.
                // This will switch user accounts for the session in cases where the user was
                // already logged in with a different account.
                await deleteSession(sessionToken);
            }
            // Update emailVerified property on the user object
            user = await updateUser({
                id: userByEmail.id,
                emailVerified: new Date()
            });
            await events.updateUser?.({
                user
            });
        } else {
            // Create user account if there isn't one for the email address already
            user = await createUser({
                ...profile,
                emailVerified: new Date()
            });
            await events.createUser?.({
                user
            });
            isNewUser = true;
        }
        // Create new session
        session = useJwtSession ? {} : await createSession({
            sessionToken: generateSessionToken(),
            userId: user.id,
            expires: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$utils$2f$date$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["fromDate"])(options.session.maxAge)
        });
        return {
            session,
            user,
            isNewUser
        };
    } else if (account.type === "webauthn") {
        // Check if the account exists
        const userByAccount = await getUserByAccount({
            providerAccountId: account.providerAccountId,
            provider: account.provider
        });
        if (userByAccount) {
            if (user) {
                // If the user is already signed in with this account, we don't need to do anything
                if (userByAccount.id === user.id) {
                    const currentAccount = {
                        ...account,
                        userId: user.id
                    };
                    return {
                        session,
                        user,
                        isNewUser,
                        account: currentAccount
                    };
                }
                // If the user is currently signed in, but the new account they are signing in
                // with is already associated with another user, then we cannot link them
                // and need to return an error.
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["AccountNotLinked"]("The account is already associated with another user", {
                    provider: account.provider
                });
            }
            // If there is no active session, but the account being signed in with is already
            // associated with a valid user then create session to sign the user in.
            session = useJwtSession ? {} : await createSession({
                sessionToken: generateSessionToken(),
                userId: userByAccount.id,
                expires: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$utils$2f$date$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["fromDate"])(options.session.maxAge)
            });
            const currentAccount = {
                ...account,
                userId: userByAccount.id
            };
            return {
                session,
                user: userByAccount,
                isNewUser,
                account: currentAccount
            };
        } else {
            // If the account doesn't exist, we'll create it
            if (user) {
                // If the user is already signed in and the account isn't already associated
                // with another user account then we can go ahead and link the accounts safely.
                await linkAccount({
                    ...account,
                    userId: user.id
                });
                await events.linkAccount?.({
                    user,
                    account,
                    profile
                });
                // As they are already signed in, we don't need to do anything after linking them
                const currentAccount = {
                    ...account,
                    userId: user.id
                };
                return {
                    session,
                    user,
                    isNewUser,
                    account: currentAccount
                };
            }
            // If the user is not signed in and it looks like a new account then we
            // check there also isn't an user account already associated with the same
            // email address as the one in the request.
            const userByEmail = profile.email ? await getUserByEmail(profile.email) : null;
            if (userByEmail) {
                // We don't trust user-provided email addresses, so we don't want to link accounts
                // if the email address associated with the new account is already associated with
                // an existing account.
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["AccountNotLinked"]("Another account already exists with the same e-mail address", {
                    provider: account.provider
                });
            } else {
                // If the current user is not logged in and the profile isn't linked to any user
                // accounts (by email or provider account id)...
                //
                // If no account matching the same [provider].id or .email exists, we can
                // create a new account for the user, link it to the OAuth account and
                // create a new session for them so they are signed in with it.
                user = await createUser({
                    ...profile
                });
            }
            await events.createUser?.({
                user
            });
            await linkAccount({
                ...account,
                userId: user.id
            });
            await events.linkAccount?.({
                user,
                account,
                profile
            });
            session = useJwtSession ? {} : await createSession({
                sessionToken: generateSessionToken(),
                userId: user.id,
                expires: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$utils$2f$date$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["fromDate"])(options.session.maxAge)
            });
            const currentAccount = {
                ...account,
                userId: user.id
            };
            return {
                session,
                user,
                isNewUser: true,
                account: currentAccount
            };
        }
    }
    // If signing in with OAuth account, check to see if the account exists already
    const userByAccount = await getUserByAccount({
        providerAccountId: account.providerAccountId,
        provider: account.provider
    });
    if (userByAccount) {
        if (user) {
            // If the user is already signed in with this account, we don't need to do anything
            if (userByAccount.id === user.id) {
                return {
                    session,
                    user,
                    isNewUser
                };
            }
            // If the user is currently signed in, but the new account they are signing in
            // with is already associated with another user, then we cannot link them
            // and need to return an error.
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["OAuthAccountNotLinked"]("The account is already associated with another user", {
                provider: account.provider
            });
        }
        // If there is no active session, but the account being signed in with is already
        // associated with a valid user then create session to sign the user in.
        session = useJwtSession ? {} : await createSession({
            sessionToken: generateSessionToken(),
            userId: userByAccount.id,
            expires: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$utils$2f$date$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["fromDate"])(options.session.maxAge)
        });
        return {
            session,
            user: userByAccount,
            isNewUser
        };
    } else {
        const { provider: p } = options;
        const { type, provider, providerAccountId, userId, ...tokenSet } = account;
        const defaults = {
            providerAccountId,
            provider,
            type,
            userId
        };
        account = Object.assign(p.account(tokenSet) ?? {}, defaults);
        if (user) {
            // If the user is already signed in and the OAuth account isn't already associated
            // with another user account then we can go ahead and link the accounts safely.
            await linkAccount({
                ...account,
                userId: user.id
            });
            await events.linkAccount?.({
                user,
                account,
                profile
            });
            // As they are already signed in, we don't need to do anything after linking them
            return {
                session,
                user,
                isNewUser
            };
        }
        // If the user is not signed in and it looks like a new OAuth account then we
        // check there also isn't an user account already associated with the same
        // email address as the one in the OAuth profile.
        //
        // This step is often overlooked in OAuth implementations, but covers the following cases:
        //
        // 1. It makes it harder for someone to accidentally create two accounts.
        //    e.g. by signin in with email, then again with an oauth account connected to the same email.
        // 2. It makes it harder to hijack a user account using a 3rd party OAuth account.
        //    e.g. by creating an oauth account then changing the email address associated with it.
        //
        // It's quite common for services to automatically link accounts in this case, but it's
        // better practice to require the user to sign in *then* link accounts to be sure
        // someone is not exploiting a problem with a third party OAuth service.
        //
        // OAuth providers should require email address verification to prevent this, but in
        // practice that is not always the case; this helps protect against that.
        const userByEmail = profile.email ? await getUserByEmail(profile.email) : null;
        if (userByEmail) {
            const provider = options.provider;
            if (provider?.allowDangerousEmailAccountLinking) {
                // If you trust the oauth provider to correctly verify email addresses, you can opt-in to
                // account linking even when the user is not signed-in.
                user = userByEmail;
                isNewUser = false;
            } else {
                // We end up here when we don't have an account with the same [provider].id *BUT*
                // we do already have an account with the same email address as the one in the
                // OAuth profile the user has just tried to sign in with.
                //
                // We don't want to have two accounts with the same email address, and we don't
                // want to link them in case it's not safe to do so, so instead we prompt the user
                // to sign in via email to verify their identity and then link the accounts.
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["OAuthAccountNotLinked"]("Another account already exists with the same e-mail address", {
                    provider: account.provider
                });
            }
        } else {
            // If the current user is not logged in and the profile isn't linked to any user
            // accounts (by email or provider account id)...
            //
            // If no account matching the same [provider].id or .email exists, we can
            // create a new account for the user, link it to the OAuth account and
            // create a new session for them so they are signed in with it.
            user = await createUser({
                ...profile,
                emailVerified: null
            });
            isNewUser = true;
        }
        await events.createUser?.({
            user
        });
        await linkAccount({
            ...account,
            userId: user.id
        });
        await events.linkAccount?.({
            user,
            account,
            profile
        });
        session = useJwtSession ? {} : await createSession({
            sessionToken: generateSessionToken(),
            userId: user.id,
            expires: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$utils$2f$date$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["fromDate"])(options.session.maxAge)
        });
        return {
            session,
            user,
            isNewUser
        };
    }
}
}}),
"[project]/node_modules/oauth4webapi/build/index.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "AUTHORIZATION_RESPONSE_ERROR": (()=>AUTHORIZATION_RESPONSE_ERROR),
    "AuthorizationResponseError": (()=>AuthorizationResponseError),
    "ClientSecretBasic": (()=>ClientSecretBasic),
    "ClientSecretJwt": (()=>ClientSecretJwt),
    "ClientSecretPost": (()=>ClientSecretPost),
    "DPoP": (()=>DPoP),
    "HTTP_REQUEST_FORBIDDEN": (()=>HTTP_REQUEST_FORBIDDEN),
    "INVALID_REQUEST": (()=>INVALID_REQUEST),
    "INVALID_RESPONSE": (()=>INVALID_RESPONSE),
    "INVALID_SERVER_METADATA": (()=>INVALID_SERVER_METADATA),
    "JSON_ATTRIBUTE_COMPARISON": (()=>JSON_ATTRIBUTE_COMPARISON),
    "JWT_CLAIM_COMPARISON": (()=>JWT_CLAIM_COMPARISON),
    "JWT_TIMESTAMP_CHECK": (()=>JWT_TIMESTAMP_CHECK),
    "JWT_USERINFO_EXPECTED": (()=>JWT_USERINFO_EXPECTED),
    "KEY_SELECTION": (()=>KEY_SELECTION),
    "MISSING_SERVER_METADATA": (()=>MISSING_SERVER_METADATA),
    "None": (()=>None),
    "OperationProcessingError": (()=>OperationProcessingError),
    "PARSE_ERROR": (()=>PARSE_ERROR),
    "PrivateKeyJwt": (()=>PrivateKeyJwt),
    "REQUEST_PROTOCOL_FORBIDDEN": (()=>REQUEST_PROTOCOL_FORBIDDEN),
    "RESPONSE_BODY_ERROR": (()=>RESPONSE_BODY_ERROR),
    "RESPONSE_IS_NOT_CONFORM": (()=>RESPONSE_IS_NOT_CONFORM),
    "RESPONSE_IS_NOT_JSON": (()=>RESPONSE_IS_NOT_JSON),
    "ResponseBodyError": (()=>ResponseBodyError),
    "TlsClientAuth": (()=>TlsClientAuth),
    "UNSUPPORTED_OPERATION": (()=>UNSUPPORTED_OPERATION),
    "UnsupportedOperationError": (()=>UnsupportedOperationError),
    "WWWAuthenticateChallengeError": (()=>WWWAuthenticateChallengeError),
    "WWW_AUTHENTICATE_CHALLENGE": (()=>WWW_AUTHENTICATE_CHALLENGE),
    "_expectedIssuer": (()=>_expectedIssuer),
    "_nodiscoverycheck": (()=>_nodiscoverycheck),
    "_nopkce": (()=>_nopkce),
    "allowInsecureRequests": (()=>allowInsecureRequests),
    "authorizationCodeGrantRequest": (()=>authorizationCodeGrantRequest),
    "calculatePKCECodeChallenge": (()=>calculatePKCECodeChallenge),
    "checkProtocol": (()=>checkProtocol),
    "clientCredentialsGrantRequest": (()=>clientCredentialsGrantRequest),
    "clockSkew": (()=>clockSkew),
    "clockTolerance": (()=>clockTolerance),
    "customFetch": (()=>customFetch),
    "deviceAuthorizationRequest": (()=>deviceAuthorizationRequest),
    "deviceCodeGrantRequest": (()=>deviceCodeGrantRequest),
    "discoveryRequest": (()=>discoveryRequest),
    "expectNoNonce": (()=>expectNoNonce),
    "expectNoState": (()=>expectNoState),
    "generateKeyPair": (()=>generateKeyPair),
    "generateRandomCodeVerifier": (()=>generateRandomCodeVerifier),
    "generateRandomNonce": (()=>generateRandomNonce),
    "generateRandomState": (()=>generateRandomState),
    "genericTokenEndpointRequest": (()=>genericTokenEndpointRequest),
    "getValidatedIdTokenClaims": (()=>getValidatedIdTokenClaims),
    "introspectionRequest": (()=>introspectionRequest),
    "isDPoPNonceError": (()=>isDPoPNonceError),
    "issueRequestObject": (()=>issueRequestObject),
    "jweDecrypt": (()=>jweDecrypt),
    "jwksCache": (()=>jwksCache),
    "modifyAssertion": (()=>modifyAssertion),
    "processAuthorizationCodeResponse": (()=>processAuthorizationCodeResponse),
    "processClientCredentialsResponse": (()=>processClientCredentialsResponse),
    "processDeviceAuthorizationResponse": (()=>processDeviceAuthorizationResponse),
    "processDeviceCodeResponse": (()=>processDeviceCodeResponse),
    "processDiscoveryResponse": (()=>processDiscoveryResponse),
    "processGenericTokenEndpointResponse": (()=>processGenericTokenEndpointResponse),
    "processIntrospectionResponse": (()=>processIntrospectionResponse),
    "processPushedAuthorizationResponse": (()=>processPushedAuthorizationResponse),
    "processRefreshTokenResponse": (()=>processRefreshTokenResponse),
    "processRevocationResponse": (()=>processRevocationResponse),
    "processUserInfoResponse": (()=>processUserInfoResponse),
    "protectedResourceRequest": (()=>protectedResourceRequest),
    "pushedAuthorizationRequest": (()=>pushedAuthorizationRequest),
    "refreshTokenGrantRequest": (()=>refreshTokenGrantRequest),
    "resolveEndpoint": (()=>resolveEndpoint),
    "revocationRequest": (()=>revocationRequest),
    "skipAuthTimeCheck": (()=>skipAuthTimeCheck),
    "skipStateCheck": (()=>skipStateCheck),
    "skipSubjectCheck": (()=>skipSubjectCheck),
    "userInfoRequest": (()=>userInfoRequest),
    "validateApplicationLevelSignature": (()=>validateApplicationLevelSignature),
    "validateAuthResponse": (()=>validateAuthResponse),
    "validateCodeIdTokenResponse": (()=>validateCodeIdTokenResponse),
    "validateDetachedSignatureResponse": (()=>validateDetachedSignatureResponse),
    "validateJwtAccessToken": (()=>validateJwtAccessToken),
    "validateJwtAuthResponse": (()=>validateJwtAuthResponse)
});
let USER_AGENT;
if (typeof navigator === 'undefined' || !navigator.userAgent?.startsWith?.('Mozilla/5.0 ')) {
    const NAME = 'oauth4webapi';
    const VERSION = 'v3.1.4';
    USER_AGENT = `${NAME}/${VERSION}`;
}
function looseInstanceOf(input, expected) {
    if (input == null) {
        return false;
    }
    try {
        return input instanceof expected || Object.getPrototypeOf(input)[Symbol.toStringTag] === expected.prototype[Symbol.toStringTag];
    } catch  {
        return false;
    }
}
const ERR_INVALID_ARG_VALUE = 'ERR_INVALID_ARG_VALUE';
const ERR_INVALID_ARG_TYPE = 'ERR_INVALID_ARG_TYPE';
function CodedTypeError(message, code, cause) {
    const err = new TypeError(message, {
        cause
    });
    Object.assign(err, {
        code
    });
    return err;
}
const allowInsecureRequests = Symbol();
const clockSkew = Symbol();
const clockTolerance = Symbol();
const customFetch = Symbol();
const modifyAssertion = Symbol();
const jweDecrypt = Symbol();
const jwksCache = Symbol();
const encoder = new TextEncoder();
const decoder = new TextDecoder();
function buf(input) {
    if (typeof input === 'string') {
        return encoder.encode(input);
    }
    return decoder.decode(input);
}
const CHUNK_SIZE = 0x8000;
function encodeBase64Url(input) {
    if (input instanceof ArrayBuffer) {
        input = new Uint8Array(input);
    }
    const arr = [];
    for(let i = 0; i < input.byteLength; i += CHUNK_SIZE){
        arr.push(String.fromCharCode.apply(null, input.subarray(i, i + CHUNK_SIZE)));
    }
    return btoa(arr.join('')).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}
function decodeBase64Url(input) {
    try {
        const binary = atob(input.replace(/-/g, '+').replace(/_/g, '/').replace(/\s/g, ''));
        const bytes = new Uint8Array(binary.length);
        for(let i = 0; i < binary.length; i++){
            bytes[i] = binary.charCodeAt(i);
        }
        return bytes;
    } catch (cause) {
        throw CodedTypeError('The input to be decoded is not correctly encoded.', ERR_INVALID_ARG_VALUE, cause);
    }
}
function b64u(input) {
    if (typeof input === 'string') {
        return decodeBase64Url(input);
    }
    return encodeBase64Url(input);
}
class UnsupportedOperationError extends Error {
    code;
    constructor(message, options){
        super(message, options);
        this.name = this.constructor.name;
        this.code = UNSUPPORTED_OPERATION;
        Error.captureStackTrace?.(this, this.constructor);
    }
}
class OperationProcessingError extends Error {
    code;
    constructor(message, options){
        super(message, options);
        this.name = this.constructor.name;
        if (options?.code) {
            this.code = options?.code;
        }
        Error.captureStackTrace?.(this, this.constructor);
    }
}
function OPE(message, code, cause) {
    return new OperationProcessingError(message, {
        code,
        cause
    });
}
function assertCryptoKey(key, it) {
    if (!(key instanceof CryptoKey)) {
        throw CodedTypeError(`${it} must be a CryptoKey`, ERR_INVALID_ARG_TYPE);
    }
}
function assertPrivateKey(key, it) {
    assertCryptoKey(key, it);
    if (key.type !== 'private') {
        throw CodedTypeError(`${it} must be a private CryptoKey`, ERR_INVALID_ARG_VALUE);
    }
}
function assertPublicKey(key, it) {
    assertCryptoKey(key, it);
    if (key.type !== 'public') {
        throw CodedTypeError(`${it} must be a public CryptoKey`, ERR_INVALID_ARG_VALUE);
    }
}
function normalizeTyp(value) {
    return value.toLowerCase().replace(/^application\//, '');
}
function isJsonObject(input) {
    if (input === null || typeof input !== 'object' || Array.isArray(input)) {
        return false;
    }
    return true;
}
function prepareHeaders(input) {
    if (looseInstanceOf(input, Headers)) {
        input = Object.fromEntries(input.entries());
    }
    const headers = new Headers(input);
    if (USER_AGENT && !headers.has('user-agent')) {
        headers.set('user-agent', USER_AGENT);
    }
    if (headers.has('authorization')) {
        throw CodedTypeError('"options.headers" must not include the "authorization" header name', ERR_INVALID_ARG_VALUE);
    }
    if (headers.has('dpop')) {
        throw CodedTypeError('"options.headers" must not include the "dpop" header name', ERR_INVALID_ARG_VALUE);
    }
    return headers;
}
function signal(value) {
    if (typeof value === 'function') {
        value = value();
    }
    if (!(value instanceof AbortSignal)) {
        throw CodedTypeError('"options.signal" must return or be an instance of AbortSignal', ERR_INVALID_ARG_TYPE);
    }
    return value;
}
async function discoveryRequest(issuerIdentifier, options) {
    if (!(issuerIdentifier instanceof URL)) {
        throw CodedTypeError('"issuerIdentifier" must be an instance of URL', ERR_INVALID_ARG_TYPE);
    }
    checkProtocol(issuerIdentifier, options?.[allowInsecureRequests] !== true);
    const url = new URL(issuerIdentifier.href);
    switch(options?.algorithm){
        case undefined:
        case 'oidc':
            url.pathname = `${url.pathname}/.well-known/openid-configuration`.replace('//', '/');
            break;
        case 'oauth2':
            if (url.pathname === '/') {
                url.pathname = '.well-known/oauth-authorization-server';
            } else {
                url.pathname = `.well-known/oauth-authorization-server/${url.pathname}`.replace('//', '/');
            }
            break;
        default:
            throw CodedTypeError('"options.algorithm" must be "oidc" (default), or "oauth2"', ERR_INVALID_ARG_VALUE);
    }
    const headers = prepareHeaders(options?.headers);
    headers.set('accept', 'application/json');
    return (options?.[customFetch] || fetch)(url.href, {
        body: undefined,
        headers: Object.fromEntries(headers.entries()),
        method: 'GET',
        redirect: 'manual',
        signal: options?.signal ? signal(options.signal) : undefined
    });
}
function assertNumber(input, allow0, it, code, cause) {
    try {
        if (typeof input !== 'number' || !Number.isFinite(input)) {
            throw CodedTypeError(`${it} must be a number`, ERR_INVALID_ARG_TYPE, cause);
        }
        if (input > 0) return;
        if (allow0 && input !== 0) {
            throw CodedTypeError(`${it} must be a non-negative number`, ERR_INVALID_ARG_VALUE, cause);
        }
        throw CodedTypeError(`${it} must be a positive number`, ERR_INVALID_ARG_VALUE, cause);
    } catch (err) {
        if (code) {
            throw OPE(err.message, code, cause);
        }
        throw err;
    }
}
function assertString(input, it, code, cause) {
    try {
        if (typeof input !== 'string') {
            throw CodedTypeError(`${it} must be a string`, ERR_INVALID_ARG_TYPE, cause);
        }
        if (input.length === 0) {
            throw CodedTypeError(`${it} must not be empty`, ERR_INVALID_ARG_VALUE, cause);
        }
    } catch (err) {
        if (code) {
            throw OPE(err.message, code, cause);
        }
        throw err;
    }
}
async function processDiscoveryResponse(expectedIssuerIdentifier, response) {
    if (!(expectedIssuerIdentifier instanceof URL) && expectedIssuerIdentifier !== _nodiscoverycheck) {
        throw CodedTypeError('"expectedIssuer" must be an instance of URL', ERR_INVALID_ARG_TYPE);
    }
    if (!looseInstanceOf(response, Response)) {
        throw CodedTypeError('"response" must be an instance of Response', ERR_INVALID_ARG_TYPE);
    }
    if (response.status !== 200) {
        throw OPE('"response" is not a conform Authorization Server Metadata response (unexpected HTTP status code)', RESPONSE_IS_NOT_CONFORM, response);
    }
    assertReadableResponse(response);
    assertApplicationJson(response);
    let json;
    try {
        json = await response.json();
    } catch (cause) {
        throw OPE('failed to parse "response" body as JSON', PARSE_ERROR, cause);
    }
    if (!isJsonObject(json)) {
        throw OPE('"response" body must be a top level object', INVALID_RESPONSE, {
            body: json
        });
    }
    assertString(json.issuer, '"response" body "issuer" property', INVALID_RESPONSE, {
        body: json
    });
    if (new URL(json.issuer).href !== expectedIssuerIdentifier.href && expectedIssuerIdentifier !== _nodiscoverycheck) {
        throw OPE('"response" body "issuer" property does not match the expected value', JSON_ATTRIBUTE_COMPARISON, {
            expected: expectedIssuerIdentifier.href,
            body: json,
            attribute: 'issuer'
        });
    }
    return json;
}
function assertApplicationJson(response) {
    assertContentType(response, 'application/json');
}
function notJson(response, ...types) {
    let msg = '"response" content-type must be ';
    if (types.length > 2) {
        const last = types.pop();
        msg += `${types.join(', ')}, or ${last}`;
    } else if (types.length === 2) {
        msg += `${types[0]} or ${types[1]}`;
    } else {
        msg += types[0];
    }
    return OPE(msg, RESPONSE_IS_NOT_JSON, response);
}
function assertContentTypes(response, ...types) {
    if (!types.includes(getContentType(response))) {
        throw notJson(response, ...types);
    }
}
function assertContentType(response, contentType) {
    if (getContentType(response) !== contentType) {
        throw notJson(response, contentType);
    }
}
function randomBytes() {
    return b64u(crypto.getRandomValues(new Uint8Array(32)));
}
function generateRandomCodeVerifier() {
    return randomBytes();
}
function generateRandomState() {
    return randomBytes();
}
function generateRandomNonce() {
    return randomBytes();
}
async function calculatePKCECodeChallenge(codeVerifier) {
    assertString(codeVerifier, 'codeVerifier');
    return b64u(await crypto.subtle.digest('SHA-256', buf(codeVerifier)));
}
function getKeyAndKid(input) {
    if (input instanceof CryptoKey) {
        return {
            key: input
        };
    }
    if (!(input?.key instanceof CryptoKey)) {
        return {};
    }
    if (input.kid !== undefined) {
        assertString(input.kid, '"kid"');
    }
    return {
        key: input.key,
        kid: input.kid
    };
}
function psAlg(key) {
    switch(key.algorithm.hash.name){
        case 'SHA-256':
            return 'PS256';
        case 'SHA-384':
            return 'PS384';
        case 'SHA-512':
            return 'PS512';
        default:
            throw new UnsupportedOperationError('unsupported RsaHashedKeyAlgorithm hash name', {
                cause: key
            });
    }
}
function rsAlg(key) {
    switch(key.algorithm.hash.name){
        case 'SHA-256':
            return 'RS256';
        case 'SHA-384':
            return 'RS384';
        case 'SHA-512':
            return 'RS512';
        default:
            throw new UnsupportedOperationError('unsupported RsaHashedKeyAlgorithm hash name', {
                cause: key
            });
    }
}
function esAlg(key) {
    switch(key.algorithm.namedCurve){
        case 'P-256':
            return 'ES256';
        case 'P-384':
            return 'ES384';
        case 'P-521':
            return 'ES512';
        default:
            throw new UnsupportedOperationError('unsupported EcKeyAlgorithm namedCurve', {
                cause: key
            });
    }
}
function keyToJws(key) {
    switch(key.algorithm.name){
        case 'RSA-PSS':
            return psAlg(key);
        case 'RSASSA-PKCS1-v1_5':
            return rsAlg(key);
        case 'ECDSA':
            return esAlg(key);
        case 'Ed25519':
        case 'EdDSA':
            return 'Ed25519';
        default:
            throw new UnsupportedOperationError('unsupported CryptoKey algorithm name', {
                cause: key
            });
    }
}
function getClockSkew(client) {
    const skew = client?.[clockSkew];
    return typeof skew === 'number' && Number.isFinite(skew) ? skew : 0;
}
function getClockTolerance(client) {
    const tolerance = client?.[clockTolerance];
    return typeof tolerance === 'number' && Number.isFinite(tolerance) && Math.sign(tolerance) !== -1 ? tolerance : 30;
}
function epochTime() {
    return Math.floor(Date.now() / 1000);
}
function assertAs(as) {
    if (typeof as !== 'object' || as === null) {
        throw CodedTypeError('"as" must be an object', ERR_INVALID_ARG_TYPE);
    }
    assertString(as.issuer, '"as.issuer"');
}
function assertClient(client) {
    if (typeof client !== 'object' || client === null) {
        throw CodedTypeError('"client" must be an object', ERR_INVALID_ARG_TYPE);
    }
    assertString(client.client_id, '"client.client_id"');
}
function formUrlEncode(token) {
    return encodeURIComponent(token).replace(/(?:[-_.!~*'()]|%20)/g, (substring)=>{
        switch(substring){
            case '-':
            case '_':
            case '.':
            case '!':
            case '~':
            case '*':
            case "'":
            case '(':
            case ')':
                return `%${substring.charCodeAt(0).toString(16).toUpperCase()}`;
            case '%20':
                return '+';
            default:
                throw new Error();
        }
    });
}
function ClientSecretPost(clientSecret) {
    assertString(clientSecret, '"clientSecret"');
    return (_as, client, body, _headers)=>{
        body.set('client_id', client.client_id);
        body.set('client_secret', clientSecret);
    };
}
function ClientSecretBasic(clientSecret) {
    assertString(clientSecret, '"clientSecret"');
    return (_as, client, _body, headers)=>{
        const username = formUrlEncode(client.client_id);
        const password = formUrlEncode(clientSecret);
        const credentials = btoa(`${username}:${password}`);
        headers.set('authorization', `Basic ${credentials}`);
    };
}
function clientAssertionPayload(as, client) {
    const now = epochTime() + getClockSkew(client);
    return {
        jti: randomBytes(),
        aud: as.issuer,
        exp: now + 60,
        iat: now,
        nbf: now,
        iss: client.client_id,
        sub: client.client_id
    };
}
function PrivateKeyJwt(clientPrivateKey, options) {
    const { key, kid } = getKeyAndKid(clientPrivateKey);
    assertPrivateKey(key, '"clientPrivateKey.key"');
    return async (as, client, body, _headers)=>{
        const header = {
            alg: keyToJws(key),
            kid
        };
        const payload = clientAssertionPayload(as, client);
        options?.[modifyAssertion]?.(header, payload);
        body.set('client_id', client.client_id);
        body.set('client_assertion_type', 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer');
        body.set('client_assertion', await signJwt(header, payload, key));
    };
}
function ClientSecretJwt(clientSecret, options) {
    assertString(clientSecret, '"clientSecret"');
    const modify = options?.[modifyAssertion];
    let key;
    return async (as, client, body, _headers)=>{
        key ||= await crypto.subtle.importKey('raw', buf(clientSecret), {
            hash: 'SHA-256',
            name: 'HMAC'
        }, false, [
            'sign'
        ]);
        const header = {
            alg: 'HS256'
        };
        const payload = clientAssertionPayload(as, client);
        modify?.(header, payload);
        const data = `${b64u(buf(JSON.stringify(header)))}.${b64u(buf(JSON.stringify(payload)))}`;
        const hmac = await crypto.subtle.sign(key.algorithm, key, buf(data));
        body.set('client_id', client.client_id);
        body.set('client_assertion_type', 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer');
        body.set('client_assertion', `${data}.${b64u(new Uint8Array(hmac))}`);
    };
}
function None() {
    return (_as, client, body, _headers)=>{
        body.set('client_id', client.client_id);
    };
}
function TlsClientAuth() {
    return None();
}
async function signJwt(header, payload, key) {
    if (!key.usages.includes('sign')) {
        throw CodedTypeError('CryptoKey instances used for signing assertions must include "sign" in their "usages"', ERR_INVALID_ARG_VALUE);
    }
    const input = `${b64u(buf(JSON.stringify(header)))}.${b64u(buf(JSON.stringify(payload)))}`;
    const signature = b64u(await crypto.subtle.sign(keyToSubtle(key), key, buf(input)));
    return `${input}.${signature}`;
}
async function issueRequestObject(as, client, parameters, privateKey, options) {
    assertAs(as);
    assertClient(client);
    parameters = new URLSearchParams(parameters);
    const { key, kid } = getKeyAndKid(privateKey);
    assertPrivateKey(key, '"privateKey.key"');
    parameters.set('client_id', client.client_id);
    const now = epochTime() + getClockSkew(client);
    const claims = {
        ...Object.fromEntries(parameters.entries()),
        jti: randomBytes(),
        aud: as.issuer,
        exp: now + 60,
        iat: now,
        nbf: now,
        iss: client.client_id
    };
    let resource;
    if (parameters.has('resource') && (resource = parameters.getAll('resource')) && resource.length > 1) {
        claims.resource = resource;
    }
    {
        let value = parameters.get('max_age');
        if (value !== null) {
            claims.max_age = parseInt(value, 10);
            assertNumber(claims.max_age, true, '"max_age" parameter');
        }
    }
    {
        let value = parameters.get('claims');
        if (value !== null) {
            try {
                claims.claims = JSON.parse(value);
            } catch (cause) {
                throw OPE('failed to parse the "claims" parameter as JSON', PARSE_ERROR, cause);
            }
            if (!isJsonObject(claims.claims)) {
                throw CodedTypeError('"claims" parameter must be a JSON with a top level object', ERR_INVALID_ARG_VALUE);
            }
        }
    }
    {
        let value = parameters.get('authorization_details');
        if (value !== null) {
            try {
                claims.authorization_details = JSON.parse(value);
            } catch (cause) {
                throw OPE('failed to parse the "authorization_details" parameter as JSON', PARSE_ERROR, cause);
            }
            if (!Array.isArray(claims.authorization_details)) {
                throw CodedTypeError('"authorization_details" parameter must be a JSON with a top level array', ERR_INVALID_ARG_VALUE);
            }
        }
    }
    const header = {
        alg: keyToJws(key),
        typ: 'oauth-authz-req+jwt',
        kid
    };
    options?.[modifyAssertion]?.(header, claims);
    return signJwt(header, claims, key);
}
let jwkCache;
async function getSetPublicJwkCache(key) {
    const { kty, e, n, x, y, crv } = await crypto.subtle.exportKey('jwk', key);
    const jwk = {
        kty,
        e,
        n,
        x,
        y,
        crv
    };
    jwkCache.set(key, jwk);
    return jwk;
}
async function publicJwk(key) {
    jwkCache ||= new WeakMap();
    return jwkCache.get(key) || getSetPublicJwkCache(key);
}
const URLParse = URL.parse ? (url, base)=>URL.parse(url, base) : (url, base)=>{
    try {
        return new URL(url, base);
    } catch  {
        return null;
    }
};
function checkProtocol(url, enforceHttps) {
    if (enforceHttps && url.protocol !== 'https:') {
        throw OPE('only requests to HTTPS are allowed', HTTP_REQUEST_FORBIDDEN, url);
    }
    if (url.protocol !== 'https:' && url.protocol !== 'http:') {
        throw OPE('only HTTP and HTTPS requests are allowed', REQUEST_PROTOCOL_FORBIDDEN, url);
    }
}
function validateEndpoint(value, endpoint, useMtlsAlias, enforceHttps) {
    let url;
    if (typeof value !== 'string' || !(url = URLParse(value))) {
        throw OPE(`authorization server metadata does not contain a valid ${useMtlsAlias ? `"as.mtls_endpoint_aliases.${endpoint}"` : `"as.${endpoint}"`}`, value === undefined ? MISSING_SERVER_METADATA : INVALID_SERVER_METADATA, {
            attribute: useMtlsAlias ? `mtls_endpoint_aliases.${endpoint}` : endpoint
        });
    }
    checkProtocol(url, enforceHttps);
    return url;
}
function resolveEndpoint(as, endpoint, useMtlsAlias, enforceHttps) {
    if (useMtlsAlias && as.mtls_endpoint_aliases && endpoint in as.mtls_endpoint_aliases) {
        return validateEndpoint(as.mtls_endpoint_aliases[endpoint], endpoint, useMtlsAlias, enforceHttps);
    }
    return validateEndpoint(as[endpoint], endpoint, useMtlsAlias, enforceHttps);
}
async function pushedAuthorizationRequest(as, client, clientAuthentication, parameters, options) {
    assertAs(as);
    assertClient(client);
    const url = resolveEndpoint(as, 'pushed_authorization_request_endpoint', client.use_mtls_endpoint_aliases, options?.[allowInsecureRequests] !== true);
    const body = new URLSearchParams(parameters);
    body.set('client_id', client.client_id);
    const headers = prepareHeaders(options?.headers);
    headers.set('accept', 'application/json');
    if (options?.DPoP !== undefined) {
        assertDPoP(options.DPoP);
        await options.DPoP.addProof(url, headers, 'POST');
    }
    const response = await authenticatedRequest(as, client, clientAuthentication, url, body, headers, options);
    options?.DPoP?.cacheNonce(response);
    return response;
}
class DPoPHandler {
    #header;
    #privateKey;
    #publicKey;
    #clockSkew;
    #modifyAssertion;
    #map;
    constructor(client, keyPair, options){
        assertPrivateKey(keyPair?.privateKey, '"DPoP.privateKey"');
        assertPublicKey(keyPair?.publicKey, '"DPoP.publicKey"');
        if (!keyPair.publicKey.extractable) {
            throw CodedTypeError('"DPoP.publicKey.extractable" must be true', ERR_INVALID_ARG_VALUE);
        }
        this.#modifyAssertion = options?.[modifyAssertion];
        this.#clockSkew = getClockSkew(client);
        this.#privateKey = keyPair.privateKey;
        this.#publicKey = keyPair.publicKey;
        branded.add(this);
    }
    #get(key) {
        this.#map ||= new Map();
        let item = this.#map.get(key);
        if (item) {
            this.#map.delete(key);
            this.#map.set(key, item);
        }
        return item;
    }
    #set(key, val) {
        this.#map ||= new Map();
        this.#map.delete(key);
        if (this.#map.size === 100) {
            this.#map.delete(this.#map.keys().next().value);
        }
        this.#map.set(key, val);
    }
    async addProof(url, headers, htm, accessToken) {
        this.#header ||= {
            alg: keyToJws(this.#privateKey),
            typ: 'dpop+jwt',
            jwk: await publicJwk(this.#publicKey)
        };
        const nonce = this.#get(url.origin);
        const now = epochTime() + this.#clockSkew;
        const payload = {
            iat: now,
            jti: randomBytes(),
            htm,
            nonce,
            htu: `${url.origin}${url.pathname}`,
            ath: accessToken ? b64u(await crypto.subtle.digest('SHA-256', buf(accessToken))) : undefined
        };
        this.#modifyAssertion?.(this.#header, payload);
        headers.set('dpop', await signJwt(this.#header, payload, this.#privateKey));
    }
    cacheNonce(response) {
        try {
            const nonce = response.headers.get('dpop-nonce');
            if (nonce) {
                this.#set(new URL(response.url).origin, nonce);
            }
        } catch  {}
    }
}
function isDPoPNonceError(err) {
    if (err instanceof WWWAuthenticateChallengeError) {
        const { 0: challenge, length } = err.cause;
        return length === 1 && challenge.scheme === 'dpop' && challenge.parameters.error === 'use_dpop_nonce';
    }
    if (err instanceof ResponseBodyError) {
        return err.error === 'use_dpop_nonce';
    }
    return false;
}
function DPoP(client, keyPair, options) {
    return new DPoPHandler(client, keyPair, options);
}
class ResponseBodyError extends Error {
    cause;
    code;
    error;
    status;
    error_description;
    response;
    constructor(message, options){
        super(message, options);
        this.name = this.constructor.name;
        this.code = RESPONSE_BODY_ERROR;
        this.cause = options.cause;
        this.error = options.cause.error;
        this.status = options.response.status;
        this.error_description = options.cause.error_description;
        Object.defineProperty(this, 'response', {
            enumerable: false,
            value: options.response
        });
        Error.captureStackTrace?.(this, this.constructor);
    }
}
class AuthorizationResponseError extends Error {
    cause;
    code;
    error;
    error_description;
    constructor(message, options){
        super(message, options);
        this.name = this.constructor.name;
        this.code = AUTHORIZATION_RESPONSE_ERROR;
        this.cause = options.cause;
        this.error = options.cause.get('error');
        this.error_description = options.cause.get('error_description') ?? undefined;
        Error.captureStackTrace?.(this, this.constructor);
    }
}
class WWWAuthenticateChallengeError extends Error {
    cause;
    code;
    response;
    status;
    constructor(message, options){
        super(message, options);
        this.name = this.constructor.name;
        this.code = WWW_AUTHENTICATE_CHALLENGE;
        this.cause = options.cause;
        this.status = options.response.status;
        this.response = options.response;
        Object.defineProperty(this, 'response', {
            enumerable: false
        });
        Error.captureStackTrace?.(this, this.constructor);
    }
}
function unquote(value) {
    if (value.length >= 2 && value[0] === '"' && value[value.length - 1] === '"') {
        return value.slice(1, -1);
    }
    return value;
}
const SPLIT_REGEXP = /((?:,|, )?[0-9a-zA-Z!#$%&'*+-.^_`|~]+=)/;
const SCHEMES_REGEXP = /(?:^|, ?)([0-9a-zA-Z!#$%&'*+\-.^_`|~]+)(?=$|[ ,])/g;
function wwwAuth(scheme, params) {
    const arr = params.split(SPLIT_REGEXP).slice(1);
    if (!arr.length) {
        return {
            scheme: scheme.toLowerCase(),
            parameters: {}
        };
    }
    arr[arr.length - 1] = arr[arr.length - 1].replace(/,$/, '');
    const parameters = {};
    for(let i = 1; i < arr.length; i += 2){
        const idx = i;
        if (arr[idx][0] === '"') {
            while(arr[idx].slice(-1) !== '"' && ++i < arr.length){
                arr[idx] += arr[i];
            }
        }
        const key = arr[idx - 1].replace(/^(?:, ?)|=$/g, '').toLowerCase();
        parameters[key] = unquote(arr[idx]);
    }
    return {
        scheme: scheme.toLowerCase(),
        parameters
    };
}
function parseWwwAuthenticateChallenges(response) {
    if (!looseInstanceOf(response, Response)) {
        throw CodedTypeError('"response" must be an instance of Response', ERR_INVALID_ARG_TYPE);
    }
    const header = response.headers.get('www-authenticate');
    if (header === null) {
        return undefined;
    }
    const result = [];
    for (const { 1: scheme, index } of header.matchAll(SCHEMES_REGEXP)){
        result.push([
            scheme,
            index
        ]);
    }
    if (!result.length) {
        return undefined;
    }
    const challenges = result.map(([scheme, indexOf], i, others)=>{
        const next = others[i + 1];
        let parameters;
        if (next) {
            parameters = header.slice(indexOf, next[1]);
        } else {
            parameters = header.slice(indexOf);
        }
        return wwwAuth(scheme, parameters);
    });
    return challenges;
}
async function processPushedAuthorizationResponse(as, client, response) {
    assertAs(as);
    assertClient(client);
    if (!looseInstanceOf(response, Response)) {
        throw CodedTypeError('"response" must be an instance of Response', ERR_INVALID_ARG_TYPE);
    }
    let challenges;
    if (challenges = parseWwwAuthenticateChallenges(response)) {
        throw new WWWAuthenticateChallengeError('server responded with a challenge in the WWW-Authenticate HTTP Header', {
            cause: challenges,
            response
        });
    }
    if (response.status !== 201) {
        let err;
        if (err = await handleOAuthBodyError(response)) {
            await response.body?.cancel();
            throw new ResponseBodyError('server responded with an error in the response body', {
                cause: err,
                response
            });
        }
        throw OPE('"response" is not a conform Pushed Authorization Request Endpoint response (unexpected HTTP status code)', RESPONSE_IS_NOT_CONFORM, response);
    }
    assertReadableResponse(response);
    assertApplicationJson(response);
    let json;
    try {
        json = await response.json();
    } catch (cause) {
        throw OPE('failed to parse "response" body as JSON', PARSE_ERROR, cause);
    }
    if (!isJsonObject(json)) {
        throw OPE('"response" body must be a top level object', INVALID_RESPONSE, {
            body: json
        });
    }
    assertString(json.request_uri, '"response" body "request_uri" property', INVALID_RESPONSE, {
        body: json
    });
    let expiresIn = typeof json.expires_in !== 'number' ? parseFloat(json.expires_in) : json.expires_in;
    assertNumber(expiresIn, false, '"response" body "expires_in" property', INVALID_RESPONSE, {
        body: json
    });
    json.expires_in = expiresIn;
    return json;
}
function assertDPoP(option) {
    if (!branded.has(option)) {
        throw CodedTypeError('"options.DPoP" is not a valid DPoPHandle', ERR_INVALID_ARG_VALUE);
    }
}
async function resourceRequest(accessToken, method, url, headers, body, options) {
    assertString(accessToken, '"accessToken"');
    if (!(url instanceof URL)) {
        throw CodedTypeError('"url" must be an instance of URL', ERR_INVALID_ARG_TYPE);
    }
    checkProtocol(url, options?.[allowInsecureRequests] !== true);
    headers = prepareHeaders(headers);
    if (options?.DPoP) {
        assertDPoP(options.DPoP);
        await options.DPoP.addProof(url, headers, method.toUpperCase(), accessToken);
        headers.set('authorization', `DPoP ${accessToken}`);
    } else {
        headers.set('authorization', `Bearer ${accessToken}`);
    }
    const response = await (options?.[customFetch] || fetch)(url.href, {
        body,
        headers: Object.fromEntries(headers.entries()),
        method,
        redirect: 'manual',
        signal: options?.signal ? signal(options.signal) : undefined
    });
    options?.DPoP?.cacheNonce(response);
    return response;
}
async function protectedResourceRequest(accessToken, method, url, headers, body, options) {
    return resourceRequest(accessToken, method, url, headers, body, options).then((response)=>{
        let challenges;
        if (challenges = parseWwwAuthenticateChallenges(response)) {
            throw new WWWAuthenticateChallengeError('server responded with a challenge in the WWW-Authenticate HTTP Header', {
                cause: challenges,
                response
            });
        }
        return response;
    });
}
async function userInfoRequest(as, client, accessToken, options) {
    assertAs(as);
    assertClient(client);
    const url = resolveEndpoint(as, 'userinfo_endpoint', client.use_mtls_endpoint_aliases, options?.[allowInsecureRequests] !== true);
    const headers = prepareHeaders(options?.headers);
    if (client.userinfo_signed_response_alg) {
        headers.set('accept', 'application/jwt');
    } else {
        headers.set('accept', 'application/json');
        headers.append('accept', 'application/jwt');
    }
    return resourceRequest(accessToken, 'GET', url, headers, null, {
        ...options,
        [clockSkew]: getClockSkew(client)
    });
}
let jwksMap;
function setJwksCache(as, jwks, uat, cache) {
    jwksMap ||= new WeakMap();
    jwksMap.set(as, {
        jwks,
        uat,
        get age () {
            return epochTime() - this.uat;
        }
    });
    if (cache) {
        Object.assign(cache, {
            jwks: structuredClone(jwks),
            uat
        });
    }
}
function isFreshJwksCache(input) {
    if (typeof input !== 'object' || input === null) {
        return false;
    }
    if (!('uat' in input) || typeof input.uat !== 'number' || epochTime() - input.uat >= 300) {
        return false;
    }
    if (!('jwks' in input) || !isJsonObject(input.jwks) || !Array.isArray(input.jwks.keys) || !Array.prototype.every.call(input.jwks.keys, isJsonObject)) {
        return false;
    }
    return true;
}
function clearJwksCache(as, cache) {
    jwksMap?.delete(as);
    delete cache?.jwks;
    delete cache?.uat;
}
async function getPublicSigKeyFromIssuerJwksUri(as, options, header) {
    const { alg, kid } = header;
    checkSupportedJwsAlg(header);
    if (!jwksMap?.has(as) && isFreshJwksCache(options?.[jwksCache])) {
        setJwksCache(as, options?.[jwksCache].jwks, options?.[jwksCache].uat);
    }
    let jwks;
    let age;
    if (jwksMap?.has(as)) {
        ;
        ({ jwks, age } = jwksMap.get(as));
        if (age >= 300) {
            clearJwksCache(as, options?.[jwksCache]);
            return getPublicSigKeyFromIssuerJwksUri(as, options, header);
        }
    } else {
        jwks = await jwksRequest(as, options).then(processJwksResponse);
        age = 0;
        setJwksCache(as, jwks, epochTime(), options?.[jwksCache]);
    }
    let kty;
    switch(alg.slice(0, 2)){
        case 'RS':
        case 'PS':
            kty = 'RSA';
            break;
        case 'ES':
            kty = 'EC';
            break;
        case 'Ed':
            kty = 'OKP';
            break;
        default:
            throw new UnsupportedOperationError('unsupported JWS algorithm', {
                cause: {
                    alg
                }
            });
    }
    const candidates = jwks.keys.filter((jwk)=>{
        if (jwk.kty !== kty) {
            return false;
        }
        if (kid !== undefined && kid !== jwk.kid) {
            return false;
        }
        if (jwk.alg !== undefined && alg !== jwk.alg) {
            return false;
        }
        if (jwk.use !== undefined && jwk.use !== 'sig') {
            return false;
        }
        if (jwk.key_ops?.includes('verify') === false) {
            return false;
        }
        switch(true){
            case alg === 'ES256' && jwk.crv !== 'P-256':
            case alg === 'ES384' && jwk.crv !== 'P-384':
            case alg === 'ES512' && jwk.crv !== 'P-521':
            case alg === 'Ed25519' && jwk.crv !== 'Ed25519':
            case alg === 'EdDSA' && jwk.crv !== 'Ed25519':
                return false;
        }
        return true;
    });
    const { 0: jwk, length } = candidates;
    if (!length) {
        if (age >= 60) {
            clearJwksCache(as, options?.[jwksCache]);
            return getPublicSigKeyFromIssuerJwksUri(as, options, header);
        }
        throw OPE('error when selecting a JWT verification key, no applicable keys found', KEY_SELECTION, {
            header,
            candidates,
            jwks_uri: new URL(as.jwks_uri)
        });
    }
    if (length !== 1) {
        throw OPE('error when selecting a JWT verification key, multiple applicable keys found, a "kid" JWT Header Parameter is required', KEY_SELECTION, {
            header,
            candidates,
            jwks_uri: new URL(as.jwks_uri)
        });
    }
    return importJwk(alg, jwk);
}
const skipSubjectCheck = Symbol();
function getContentType(input) {
    return input.headers.get('content-type')?.split(';')[0];
}
async function processUserInfoResponse(as, client, expectedSubject, response, options) {
    assertAs(as);
    assertClient(client);
    if (!looseInstanceOf(response, Response)) {
        throw CodedTypeError('"response" must be an instance of Response', ERR_INVALID_ARG_TYPE);
    }
    let challenges;
    if (challenges = parseWwwAuthenticateChallenges(response)) {
        throw new WWWAuthenticateChallengeError('server responded with a challenge in the WWW-Authenticate HTTP Header', {
            cause: challenges,
            response
        });
    }
    if (response.status !== 200) {
        throw OPE('"response" is not a conform UserInfo Endpoint response (unexpected HTTP status code)', RESPONSE_IS_NOT_CONFORM, response);
    }
    assertReadableResponse(response);
    let json;
    if (getContentType(response) === 'application/jwt') {
        const { claims, jwt } = await validateJwt(await response.text(), checkSigningAlgorithm.bind(undefined, client.userinfo_signed_response_alg, as.userinfo_signing_alg_values_supported, undefined), getClockSkew(client), getClockTolerance(client), options?.[jweDecrypt]).then(validateOptionalAudience.bind(undefined, client.client_id)).then(validateOptionalIssuer.bind(undefined, as));
        jwtRefs.set(response, jwt);
        json = claims;
    } else {
        if (client.userinfo_signed_response_alg) {
            throw OPE('JWT UserInfo Response expected', JWT_USERINFO_EXPECTED, response);
        }
        assertApplicationJson(response);
        try {
            json = await response.json();
        } catch (cause) {
            throw OPE('failed to parse "response" body as JSON', PARSE_ERROR, cause);
        }
    }
    if (!isJsonObject(json)) {
        throw OPE('"response" body must be a top level object', INVALID_RESPONSE, {
            body: json
        });
    }
    assertString(json.sub, '"response" body "sub" property', INVALID_RESPONSE, {
        body: json
    });
    switch(expectedSubject){
        case skipSubjectCheck:
            break;
        default:
            assertString(expectedSubject, '"expectedSubject"');
            if (json.sub !== expectedSubject) {
                throw OPE('unexpected "response" body "sub" property value', JSON_ATTRIBUTE_COMPARISON, {
                    expected: expectedSubject,
                    body: json,
                    attribute: 'sub'
                });
            }
    }
    return json;
}
async function authenticatedRequest(as, client, clientAuthentication, url, body, headers, options) {
    await clientAuthentication(as, client, body, headers);
    headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
    return (options?.[customFetch] || fetch)(url.href, {
        body,
        headers: Object.fromEntries(headers.entries()),
        method: 'POST',
        redirect: 'manual',
        signal: options?.signal ? signal(options.signal) : undefined
    });
}
async function tokenEndpointRequest(as, client, clientAuthentication, grantType, parameters, options) {
    const url = resolveEndpoint(as, 'token_endpoint', client.use_mtls_endpoint_aliases, options?.[allowInsecureRequests] !== true);
    parameters.set('grant_type', grantType);
    const headers = prepareHeaders(options?.headers);
    headers.set('accept', 'application/json');
    if (options?.DPoP !== undefined) {
        assertDPoP(options.DPoP);
        await options.DPoP.addProof(url, headers, 'POST');
    }
    const response = await authenticatedRequest(as, client, clientAuthentication, url, parameters, headers, options);
    options?.DPoP?.cacheNonce(response);
    return response;
}
async function refreshTokenGrantRequest(as, client, clientAuthentication, refreshToken, options) {
    assertAs(as);
    assertClient(client);
    assertString(refreshToken, '"refreshToken"');
    const parameters = new URLSearchParams(options?.additionalParameters);
    parameters.set('refresh_token', refreshToken);
    return tokenEndpointRequest(as, client, clientAuthentication, 'refresh_token', parameters, options);
}
const idTokenClaims = new WeakMap();
const jwtRefs = new WeakMap();
function getValidatedIdTokenClaims(ref) {
    if (!ref.id_token) {
        return undefined;
    }
    const claims = idTokenClaims.get(ref);
    if (!claims) {
        throw CodedTypeError('"ref" was already garbage collected or did not resolve from the proper sources', ERR_INVALID_ARG_VALUE);
    }
    return claims;
}
async function validateApplicationLevelSignature(as, ref, options) {
    assertAs(as);
    if (!jwtRefs.has(ref)) {
        throw CodedTypeError('"ref" does not contain a processed JWT Response to verify the signature of', ERR_INVALID_ARG_VALUE);
    }
    const { 0: protectedHeader, 1: payload, 2: encodedSignature } = jwtRefs.get(ref).split('.');
    const header = JSON.parse(buf(b64u(protectedHeader)));
    if (header.alg.startsWith('HS')) {
        throw new UnsupportedOperationError('unsupported JWS algorithm', {
            cause: {
                alg: header.alg
            }
        });
    }
    let key;
    key = await getPublicSigKeyFromIssuerJwksUri(as, options, header);
    await validateJwsSignature(protectedHeader, payload, key, b64u(encodedSignature));
}
async function processGenericAccessTokenResponse(as, client, response, additionalRequiredIdTokenClaims, options) {
    assertAs(as);
    assertClient(client);
    if (!looseInstanceOf(response, Response)) {
        throw CodedTypeError('"response" must be an instance of Response', ERR_INVALID_ARG_TYPE);
    }
    let challenges;
    if (challenges = parseWwwAuthenticateChallenges(response)) {
        throw new WWWAuthenticateChallengeError('server responded with a challenge in the WWW-Authenticate HTTP Header', {
            cause: challenges,
            response
        });
    }
    if (response.status !== 200) {
        let err;
        if (err = await handleOAuthBodyError(response)) {
            await response.body?.cancel();
            throw new ResponseBodyError('server responded with an error in the response body', {
                cause: err,
                response
            });
        }
        throw OPE('"response" is not a conform Token Endpoint response (unexpected HTTP status code)', RESPONSE_IS_NOT_CONFORM, response);
    }
    assertReadableResponse(response);
    assertApplicationJson(response);
    let json;
    try {
        json = await response.json();
    } catch (cause) {
        throw OPE('failed to parse "response" body as JSON', PARSE_ERROR, cause);
    }
    if (!isJsonObject(json)) {
        throw OPE('"response" body must be a top level object', INVALID_RESPONSE, {
            body: json
        });
    }
    assertString(json.access_token, '"response" body "access_token" property', INVALID_RESPONSE, {
        body: json
    });
    assertString(json.token_type, '"response" body "token_type" property', INVALID_RESPONSE, {
        body: json
    });
    json.token_type = json.token_type.toLowerCase();
    if (json.token_type !== 'dpop' && json.token_type !== 'bearer') {
        throw new UnsupportedOperationError('unsupported `token_type` value', {
            cause: {
                body: json
            }
        });
    }
    if (json.expires_in !== undefined) {
        let expiresIn = typeof json.expires_in !== 'number' ? parseFloat(json.expires_in) : json.expires_in;
        assertNumber(expiresIn, false, '"response" body "expires_in" property', INVALID_RESPONSE, {
            body: json
        });
        json.expires_in = expiresIn;
    }
    if (json.refresh_token !== undefined) {
        assertString(json.refresh_token, '"response" body "refresh_token" property', INVALID_RESPONSE, {
            body: json
        });
    }
    if (json.scope !== undefined && typeof json.scope !== 'string') {
        throw OPE('"response" body "scope" property must be a string', INVALID_RESPONSE, {
            body: json
        });
    }
    if (json.id_token !== undefined) {
        assertString(json.id_token, '"response" body "id_token" property', INVALID_RESPONSE, {
            body: json
        });
        const requiredClaims = [
            'aud',
            'exp',
            'iat',
            'iss',
            'sub'
        ];
        if (client.require_auth_time === true) {
            requiredClaims.push('auth_time');
        }
        if (client.default_max_age !== undefined) {
            assertNumber(client.default_max_age, false, '"client.default_max_age"');
            requiredClaims.push('auth_time');
        }
        if (additionalRequiredIdTokenClaims?.length) {
            requiredClaims.push(...additionalRequiredIdTokenClaims);
        }
        const { claims, jwt } = await validateJwt(json.id_token, checkSigningAlgorithm.bind(undefined, client.id_token_signed_response_alg, as.id_token_signing_alg_values_supported, 'RS256'), getClockSkew(client), getClockTolerance(client), options?.[jweDecrypt]).then(validatePresence.bind(undefined, requiredClaims)).then(validateIssuer.bind(undefined, as)).then(validateAudience.bind(undefined, client.client_id));
        if (Array.isArray(claims.aud) && claims.aud.length !== 1) {
            if (claims.azp === undefined) {
                throw OPE('ID Token "aud" (audience) claim includes additional untrusted audiences', JWT_CLAIM_COMPARISON, {
                    claims,
                    claim: 'aud'
                });
            }
            if (claims.azp !== client.client_id) {
                throw OPE('unexpected ID Token "azp" (authorized party) claim value', JWT_CLAIM_COMPARISON, {
                    expected: client.client_id,
                    claims,
                    claim: 'azp'
                });
            }
        }
        if (claims.auth_time !== undefined) {
            assertNumber(claims.auth_time, false, 'ID Token "auth_time" (authentication time)', INVALID_RESPONSE, {
                claims
            });
        }
        jwtRefs.set(response, jwt);
        idTokenClaims.set(json, claims);
    }
    return json;
}
async function processRefreshTokenResponse(as, client, response, options) {
    return processGenericAccessTokenResponse(as, client, response, undefined, options);
}
function validateOptionalAudience(expected, result) {
    if (result.claims.aud !== undefined) {
        return validateAudience(expected, result);
    }
    return result;
}
function validateAudience(expected, result) {
    if (Array.isArray(result.claims.aud)) {
        if (!result.claims.aud.includes(expected)) {
            throw OPE('unexpected JWT "aud" (audience) claim value', JWT_CLAIM_COMPARISON, {
                expected,
                claims: result.claims,
                claim: 'aud'
            });
        }
    } else if (result.claims.aud !== expected) {
        throw OPE('unexpected JWT "aud" (audience) claim value', JWT_CLAIM_COMPARISON, {
            expected,
            claims: result.claims,
            claim: 'aud'
        });
    }
    return result;
}
function validateOptionalIssuer(as, result) {
    if (result.claims.iss !== undefined) {
        return validateIssuer(as, result);
    }
    return result;
}
function validateIssuer(as, result) {
    const expected = as[_expectedIssuer]?.(result) ?? as.issuer;
    if (result.claims.iss !== expected) {
        throw OPE('unexpected JWT "iss" (issuer) claim value', JWT_CLAIM_COMPARISON, {
            expected,
            claims: result.claims,
            claim: 'iss'
        });
    }
    return result;
}
const branded = new WeakSet();
function brand(searchParams) {
    branded.add(searchParams);
    return searchParams;
}
async function authorizationCodeGrantRequest(as, client, clientAuthentication, callbackParameters, redirectUri, codeVerifier, options) {
    assertAs(as);
    assertClient(client);
    if (!branded.has(callbackParameters)) {
        throw CodedTypeError('"callbackParameters" must be an instance of URLSearchParams obtained from "validateAuthResponse()", or "validateJwtAuthResponse()', ERR_INVALID_ARG_VALUE);
    }
    assertString(redirectUri, '"redirectUri"');
    const code = getURLSearchParameter(callbackParameters, 'code');
    if (!code) {
        throw OPE('no authorization code in "callbackParameters"', INVALID_RESPONSE);
    }
    const parameters = new URLSearchParams(options?.additionalParameters);
    parameters.set('redirect_uri', redirectUri);
    parameters.set('code', code);
    if (codeVerifier !== _nopkce) {
        assertString(codeVerifier, '"codeVerifier"');
        parameters.set('code_verifier', codeVerifier);
    }
    return tokenEndpointRequest(as, client, clientAuthentication, 'authorization_code', parameters, options);
}
const jwtClaimNames = {
    aud: 'audience',
    c_hash: 'code hash',
    client_id: 'client id',
    exp: 'expiration time',
    iat: 'issued at',
    iss: 'issuer',
    jti: 'jwt id',
    nonce: 'nonce',
    s_hash: 'state hash',
    sub: 'subject',
    ath: 'access token hash',
    htm: 'http method',
    htu: 'http uri',
    cnf: 'confirmation',
    auth_time: 'authentication time'
};
function validatePresence(required, result) {
    for (const claim of required){
        if (result.claims[claim] === undefined) {
            throw OPE(`JWT "${claim}" (${jwtClaimNames[claim]}) claim missing`, INVALID_RESPONSE, {
                claims: result.claims
            });
        }
    }
    return result;
}
const expectNoNonce = Symbol();
const skipAuthTimeCheck = Symbol();
async function processAuthorizationCodeResponse(as, client, response, options) {
    if (typeof options?.expectedNonce === 'string' || typeof options?.maxAge === 'number' || options?.requireIdToken) {
        return processAuthorizationCodeOpenIDResponse(as, client, response, options.expectedNonce, options.maxAge, {
            [jweDecrypt]: options[jweDecrypt]
        });
    }
    return processAuthorizationCodeOAuth2Response(as, client, response, options);
}
async function processAuthorizationCodeOpenIDResponse(as, client, response, expectedNonce, maxAge, options) {
    const additionalRequiredClaims = [];
    switch(expectedNonce){
        case undefined:
            expectedNonce = expectNoNonce;
            break;
        case expectNoNonce:
            break;
        default:
            assertString(expectedNonce, '"expectedNonce" argument');
            additionalRequiredClaims.push('nonce');
    }
    maxAge ??= client.default_max_age;
    switch(maxAge){
        case undefined:
            maxAge = skipAuthTimeCheck;
            break;
        case skipAuthTimeCheck:
            break;
        default:
            assertNumber(maxAge, false, '"maxAge" argument');
            additionalRequiredClaims.push('auth_time');
    }
    const result = await processGenericAccessTokenResponse(as, client, response, additionalRequiredClaims, options);
    assertString(result.id_token, '"response" body "id_token" property', INVALID_RESPONSE, {
        body: result
    });
    const claims = getValidatedIdTokenClaims(result);
    if (maxAge !== skipAuthTimeCheck) {
        const now = epochTime() + getClockSkew(client);
        const tolerance = getClockTolerance(client);
        if (claims.auth_time + maxAge < now - tolerance) {
            throw OPE('too much time has elapsed since the last End-User authentication', JWT_TIMESTAMP_CHECK, {
                claims,
                now,
                tolerance,
                claim: 'auth_time'
            });
        }
    }
    if (expectedNonce === expectNoNonce) {
        if (claims.nonce !== undefined) {
            throw OPE('unexpected ID Token "nonce" claim value', JWT_CLAIM_COMPARISON, {
                expected: undefined,
                claims,
                claim: 'nonce'
            });
        }
    } else if (claims.nonce !== expectedNonce) {
        throw OPE('unexpected ID Token "nonce" claim value', JWT_CLAIM_COMPARISON, {
            expected: expectedNonce,
            claims,
            claim: 'nonce'
        });
    }
    return result;
}
async function processAuthorizationCodeOAuth2Response(as, client, response, options) {
    const result = await processGenericAccessTokenResponse(as, client, response, undefined, options);
    const claims = getValidatedIdTokenClaims(result);
    if (claims) {
        if (client.default_max_age !== undefined) {
            assertNumber(client.default_max_age, false, '"client.default_max_age"');
            const now = epochTime() + getClockSkew(client);
            const tolerance = getClockTolerance(client);
            if (claims.auth_time + client.default_max_age < now - tolerance) {
                throw OPE('too much time has elapsed since the last End-User authentication', JWT_TIMESTAMP_CHECK, {
                    claims,
                    now,
                    tolerance,
                    claim: 'auth_time'
                });
            }
        }
        if (claims.nonce !== undefined) {
            throw OPE('unexpected ID Token "nonce" claim value', JWT_CLAIM_COMPARISON, {
                expected: undefined,
                claims,
                claim: 'nonce'
            });
        }
    }
    return result;
}
const WWW_AUTHENTICATE_CHALLENGE = 'OAUTH_WWW_AUTHENTICATE_CHALLENGE';
const RESPONSE_BODY_ERROR = 'OAUTH_RESPONSE_BODY_ERROR';
const UNSUPPORTED_OPERATION = 'OAUTH_UNSUPPORTED_OPERATION';
const AUTHORIZATION_RESPONSE_ERROR = 'OAUTH_AUTHORIZATION_RESPONSE_ERROR';
const JWT_USERINFO_EXPECTED = 'OAUTH_JWT_USERINFO_EXPECTED';
const PARSE_ERROR = 'OAUTH_PARSE_ERROR';
const INVALID_RESPONSE = 'OAUTH_INVALID_RESPONSE';
const INVALID_REQUEST = 'OAUTH_INVALID_REQUEST';
const RESPONSE_IS_NOT_JSON = 'OAUTH_RESPONSE_IS_NOT_JSON';
const RESPONSE_IS_NOT_CONFORM = 'OAUTH_RESPONSE_IS_NOT_CONFORM';
const HTTP_REQUEST_FORBIDDEN = 'OAUTH_HTTP_REQUEST_FORBIDDEN';
const REQUEST_PROTOCOL_FORBIDDEN = 'OAUTH_REQUEST_PROTOCOL_FORBIDDEN';
const JWT_TIMESTAMP_CHECK = 'OAUTH_JWT_TIMESTAMP_CHECK_FAILED';
const JWT_CLAIM_COMPARISON = 'OAUTH_JWT_CLAIM_COMPARISON_FAILED';
const JSON_ATTRIBUTE_COMPARISON = 'OAUTH_JSON_ATTRIBUTE_COMPARISON_FAILED';
const KEY_SELECTION = 'OAUTH_KEY_SELECTION_FAILED';
const MISSING_SERVER_METADATA = 'OAUTH_MISSING_SERVER_METADATA';
const INVALID_SERVER_METADATA = 'OAUTH_INVALID_SERVER_METADATA';
function checkJwtType(expected, result) {
    if (typeof result.header.typ !== 'string' || normalizeTyp(result.header.typ) !== expected) {
        throw OPE('unexpected JWT "typ" header parameter value', INVALID_RESPONSE, {
            header: result.header
        });
    }
    return result;
}
async function clientCredentialsGrantRequest(as, client, clientAuthentication, parameters, options) {
    assertAs(as);
    assertClient(client);
    return tokenEndpointRequest(as, client, clientAuthentication, 'client_credentials', new URLSearchParams(parameters), options);
}
async function genericTokenEndpointRequest(as, client, clientAuthentication, grantType, parameters, options) {
    assertAs(as);
    assertClient(client);
    assertString(grantType, '"grantType"');
    return tokenEndpointRequest(as, client, clientAuthentication, grantType, new URLSearchParams(parameters), options);
}
async function processGenericTokenEndpointResponse(as, client, response, options) {
    return processGenericAccessTokenResponse(as, client, response, undefined, options);
}
async function processClientCredentialsResponse(as, client, response, options) {
    return processGenericAccessTokenResponse(as, client, response, undefined, options);
}
async function revocationRequest(as, client, clientAuthentication, token, options) {
    assertAs(as);
    assertClient(client);
    assertString(token, '"token"');
    const url = resolveEndpoint(as, 'revocation_endpoint', client.use_mtls_endpoint_aliases, options?.[allowInsecureRequests] !== true);
    const body = new URLSearchParams(options?.additionalParameters);
    body.set('token', token);
    const headers = prepareHeaders(options?.headers);
    headers.delete('accept');
    return authenticatedRequest(as, client, clientAuthentication, url, body, headers, options);
}
async function processRevocationResponse(response) {
    if (!looseInstanceOf(response, Response)) {
        throw CodedTypeError('"response" must be an instance of Response', ERR_INVALID_ARG_TYPE);
    }
    let challenges;
    if (challenges = parseWwwAuthenticateChallenges(response)) {
        throw new WWWAuthenticateChallengeError('server responded with a challenge in the WWW-Authenticate HTTP Header', {
            cause: challenges,
            response
        });
    }
    if (response.status !== 200) {
        let err;
        if (err = await handleOAuthBodyError(response)) {
            await response.body?.cancel();
            throw new ResponseBodyError('server responded with an error in the response body', {
                cause: err,
                response
            });
        }
        throw OPE('"response" is not a conform Revocation Endpoint response (unexpected HTTP status code)', RESPONSE_IS_NOT_CONFORM, response);
    }
    return undefined;
}
function assertReadableResponse(response) {
    if (response.bodyUsed) {
        throw CodedTypeError('"response" body has been used already', ERR_INVALID_ARG_VALUE);
    }
}
async function introspectionRequest(as, client, clientAuthentication, token, options) {
    assertAs(as);
    assertClient(client);
    assertString(token, '"token"');
    const url = resolveEndpoint(as, 'introspection_endpoint', client.use_mtls_endpoint_aliases, options?.[allowInsecureRequests] !== true);
    const body = new URLSearchParams(options?.additionalParameters);
    body.set('token', token);
    const headers = prepareHeaders(options?.headers);
    if (options?.requestJwtResponse ?? client.introspection_signed_response_alg) {
        headers.set('accept', 'application/token-introspection+jwt');
    } else {
        headers.set('accept', 'application/json');
    }
    return authenticatedRequest(as, client, clientAuthentication, url, body, headers, options);
}
async function processIntrospectionResponse(as, client, response, options) {
    assertAs(as);
    assertClient(client);
    if (!looseInstanceOf(response, Response)) {
        throw CodedTypeError('"response" must be an instance of Response', ERR_INVALID_ARG_TYPE);
    }
    let challenges;
    if (challenges = parseWwwAuthenticateChallenges(response)) {
        throw new WWWAuthenticateChallengeError('server responded with a challenge in the WWW-Authenticate HTTP Header', {
            cause: challenges,
            response
        });
    }
    if (response.status !== 200) {
        let err;
        if (err = await handleOAuthBodyError(response)) {
            await response.body?.cancel();
            throw new ResponseBodyError('server responded with an error in the response body', {
                cause: err,
                response
            });
        }
        throw OPE('"response" is not a conform Introspection Endpoint response (unexpected HTTP status code)', RESPONSE_IS_NOT_CONFORM, response);
    }
    let json;
    if (getContentType(response) === 'application/token-introspection+jwt') {
        assertReadableResponse(response);
        const { claims, jwt } = await validateJwt(await response.text(), checkSigningAlgorithm.bind(undefined, client.introspection_signed_response_alg, as.introspection_signing_alg_values_supported, 'RS256'), getClockSkew(client), getClockTolerance(client), options?.[jweDecrypt]).then(checkJwtType.bind(undefined, 'token-introspection+jwt')).then(validatePresence.bind(undefined, [
            'aud',
            'iat',
            'iss'
        ])).then(validateIssuer.bind(undefined, as)).then(validateAudience.bind(undefined, client.client_id));
        jwtRefs.set(response, jwt);
        json = claims.token_introspection;
        if (!isJsonObject(json)) {
            throw OPE('JWT "token_introspection" claim must be a JSON object', INVALID_RESPONSE, {
                claims
            });
        }
    } else {
        assertReadableResponse(response);
        assertApplicationJson(response);
        try {
            json = await response.json();
        } catch (cause) {
            throw OPE('failed to parse "response" body as JSON', PARSE_ERROR, cause);
        }
        if (!isJsonObject(json)) {
            throw OPE('"response" body must be a top level object', INVALID_RESPONSE, {
                body: json
            });
        }
    }
    if (typeof json.active !== 'boolean') {
        throw OPE('"response" body "active" property must be a boolean', INVALID_RESPONSE, {
            body: json
        });
    }
    return json;
}
async function jwksRequest(as, options) {
    assertAs(as);
    const url = resolveEndpoint(as, 'jwks_uri', false, options?.[allowInsecureRequests] !== true);
    const headers = prepareHeaders(options?.headers);
    headers.set('accept', 'application/json');
    headers.append('accept', 'application/jwk-set+json');
    return (options?.[customFetch] || fetch)(url.href, {
        body: undefined,
        headers: Object.fromEntries(headers.entries()),
        method: 'GET',
        redirect: 'manual',
        signal: options?.signal ? signal(options.signal) : undefined
    });
}
async function processJwksResponse(response) {
    if (!looseInstanceOf(response, Response)) {
        throw CodedTypeError('"response" must be an instance of Response', ERR_INVALID_ARG_TYPE);
    }
    if (response.status !== 200) {
        throw OPE('"response" is not a conform JSON Web Key Set response (unexpected HTTP status code)', RESPONSE_IS_NOT_CONFORM, response);
    }
    assertReadableResponse(response);
    assertContentTypes(response, 'application/json', 'application/jwk-set+json');
    let json;
    try {
        json = await response.json();
    } catch (cause) {
        throw OPE('failed to parse "response" body as JSON', PARSE_ERROR, cause);
    }
    if (!isJsonObject(json)) {
        throw OPE('"response" body must be a top level object', INVALID_RESPONSE, {
            body: json
        });
    }
    if (!Array.isArray(json.keys)) {
        throw OPE('"response" body "keys" property must be an array', INVALID_RESPONSE, {
            body: json
        });
    }
    if (!Array.prototype.every.call(json.keys, isJsonObject)) {
        throw OPE('"response" body "keys" property members must be JWK formatted objects', INVALID_RESPONSE, {
            body: json
        });
    }
    return json;
}
async function handleOAuthBodyError(response) {
    if (response.status > 399 && response.status < 500) {
        assertReadableResponse(response);
        assertApplicationJson(response);
        try {
            const json = await response.clone().json();
            if (isJsonObject(json) && typeof json.error === 'string' && json.error.length) {
                return json;
            }
        } catch  {}
    }
    return undefined;
}
function supported(alg) {
    switch(alg){
        case 'PS256':
        case 'ES256':
        case 'RS256':
        case 'PS384':
        case 'ES384':
        case 'RS384':
        case 'PS512':
        case 'ES512':
        case 'RS512':
        case 'Ed25519':
        case 'EdDSA':
            return true;
        default:
            return false;
    }
}
function checkSupportedJwsAlg(header) {
    if (!supported(header.alg)) {
        throw new UnsupportedOperationError('unsupported JWS "alg" identifier', {
            cause: {
                alg: header.alg
            }
        });
    }
}
function checkRsaKeyAlgorithm(key) {
    const { algorithm } = key;
    if (typeof algorithm.modulusLength !== 'number' || algorithm.modulusLength < 2048) {
        throw new UnsupportedOperationError(`unsupported ${algorithm.name} modulusLength`, {
            cause: key
        });
    }
}
function ecdsaHashName(key) {
    const { algorithm } = key;
    switch(algorithm.namedCurve){
        case 'P-256':
            return 'SHA-256';
        case 'P-384':
            return 'SHA-384';
        case 'P-521':
            return 'SHA-512';
        default:
            throw new UnsupportedOperationError('unsupported ECDSA namedCurve', {
                cause: key
            });
    }
}
function keyToSubtle(key) {
    switch(key.algorithm.name){
        case 'ECDSA':
            return {
                name: key.algorithm.name,
                hash: ecdsaHashName(key)
            };
        case 'RSA-PSS':
            {
                checkRsaKeyAlgorithm(key);
                switch(key.algorithm.hash.name){
                    case 'SHA-256':
                    case 'SHA-384':
                    case 'SHA-512':
                        return {
                            name: key.algorithm.name,
                            saltLength: parseInt(key.algorithm.hash.name.slice(-3), 10) >> 3
                        };
                    default:
                        throw new UnsupportedOperationError('unsupported RSA-PSS hash name', {
                            cause: key
                        });
                }
            }
        case 'RSASSA-PKCS1-v1_5':
            checkRsaKeyAlgorithm(key);
            return key.algorithm.name;
        case 'Ed25519':
        case 'EdDSA':
            return key.algorithm.name;
    }
    throw new UnsupportedOperationError('unsupported CryptoKey algorithm name', {
        cause: key
    });
}
async function validateJwsSignature(protectedHeader, payload, key, signature) {
    const data = buf(`${protectedHeader}.${payload}`);
    const algorithm = keyToSubtle(key);
    const verified = await crypto.subtle.verify(algorithm, key, signature, data);
    if (!verified) {
        throw OPE('JWT signature verification failed', INVALID_RESPONSE, {
            key,
            data,
            signature,
            algorithm
        });
    }
}
async function validateJwt(jws, checkAlg, clockSkew, clockTolerance, decryptJwt) {
    let { 0: protectedHeader, 1: payload, length } = jws.split('.');
    if (length === 5) {
        if (decryptJwt !== undefined) {
            jws = await decryptJwt(jws);
            ({ 0: protectedHeader, 1: payload, length } = jws.split('.'));
        } else {
            throw new UnsupportedOperationError('JWE decryption is not configured', {
                cause: jws
            });
        }
    }
    if (length !== 3) {
        throw OPE('Invalid JWT', INVALID_RESPONSE, jws);
    }
    let header;
    try {
        header = JSON.parse(buf(b64u(protectedHeader)));
    } catch (cause) {
        throw OPE('failed to parse JWT Header body as base64url encoded JSON', PARSE_ERROR, cause);
    }
    if (!isJsonObject(header)) {
        throw OPE('JWT Header must be a top level object', INVALID_RESPONSE, jws);
    }
    checkAlg(header);
    if (header.crit !== undefined) {
        throw new UnsupportedOperationError('no JWT "crit" header parameter extensions are supported', {
            cause: {
                header
            }
        });
    }
    let claims;
    try {
        claims = JSON.parse(buf(b64u(payload)));
    } catch (cause) {
        throw OPE('failed to parse JWT Payload body as base64url encoded JSON', PARSE_ERROR, cause);
    }
    if (!isJsonObject(claims)) {
        throw OPE('JWT Payload must be a top level object', INVALID_RESPONSE, jws);
    }
    const now = epochTime() + clockSkew;
    if (claims.exp !== undefined) {
        if (typeof claims.exp !== 'number') {
            throw OPE('unexpected JWT "exp" (expiration time) claim type', INVALID_RESPONSE, {
                claims
            });
        }
        if (claims.exp <= now - clockTolerance) {
            throw OPE('unexpected JWT "exp" (expiration time) claim value, expiration is past current timestamp', JWT_TIMESTAMP_CHECK, {
                claims,
                now,
                tolerance: clockTolerance,
                claim: 'exp'
            });
        }
    }
    if (claims.iat !== undefined) {
        if (typeof claims.iat !== 'number') {
            throw OPE('unexpected JWT "iat" (issued at) claim type', INVALID_RESPONSE, {
                claims
            });
        }
    }
    if (claims.iss !== undefined) {
        if (typeof claims.iss !== 'string') {
            throw OPE('unexpected JWT "iss" (issuer) claim type', INVALID_RESPONSE, {
                claims
            });
        }
    }
    if (claims.nbf !== undefined) {
        if (typeof claims.nbf !== 'number') {
            throw OPE('unexpected JWT "nbf" (not before) claim type', INVALID_RESPONSE, {
                claims
            });
        }
        if (claims.nbf > now + clockTolerance) {
            throw OPE('unexpected JWT "nbf" (not before) claim value', JWT_TIMESTAMP_CHECK, {
                claims,
                now,
                tolerance: clockTolerance,
                claim: 'nbf'
            });
        }
    }
    if (claims.aud !== undefined) {
        if (typeof claims.aud !== 'string' && !Array.isArray(claims.aud)) {
            throw OPE('unexpected JWT "aud" (audience) claim type', INVALID_RESPONSE, {
                claims
            });
        }
    }
    return {
        header,
        claims,
        jwt: jws
    };
}
async function validateJwtAuthResponse(as, client, parameters, expectedState, options) {
    assertAs(as);
    assertClient(client);
    if (parameters instanceof URL) {
        parameters = parameters.searchParams;
    }
    if (!(parameters instanceof URLSearchParams)) {
        throw CodedTypeError('"parameters" must be an instance of URLSearchParams, or URL', ERR_INVALID_ARG_TYPE);
    }
    const response = getURLSearchParameter(parameters, 'response');
    if (!response) {
        throw OPE('"parameters" does not contain a JARM response', INVALID_RESPONSE);
    }
    const { claims, header, jwt } = await validateJwt(response, checkSigningAlgorithm.bind(undefined, client.authorization_signed_response_alg, as.authorization_signing_alg_values_supported, 'RS256'), getClockSkew(client), getClockTolerance(client), options?.[jweDecrypt]).then(validatePresence.bind(undefined, [
        'aud',
        'exp',
        'iss'
    ])).then(validateIssuer.bind(undefined, as)).then(validateAudience.bind(undefined, client.client_id));
    const { 0: protectedHeader, 1: payload, 2: encodedSignature } = jwt.split('.');
    const signature = b64u(encodedSignature);
    const key = await getPublicSigKeyFromIssuerJwksUri(as, options, header);
    await validateJwsSignature(protectedHeader, payload, key, signature);
    const result = new URLSearchParams();
    for (const [key, value] of Object.entries(claims)){
        if (typeof value === 'string' && key !== 'aud') {
            result.set(key, value);
        }
    }
    return validateAuthResponse(as, client, result, expectedState);
}
async function idTokenHash(data, header, claimName) {
    let algorithm;
    switch(header.alg){
        case 'RS256':
        case 'PS256':
        case 'ES256':
            algorithm = 'SHA-256';
            break;
        case 'RS384':
        case 'PS384':
        case 'ES384':
            algorithm = 'SHA-384';
            break;
        case 'RS512':
        case 'PS512':
        case 'ES512':
        case 'Ed25519':
        case 'EdDSA':
            algorithm = 'SHA-512';
            break;
        default:
            throw new UnsupportedOperationError(`unsupported JWS algorithm for ${claimName} calculation`, {
                cause: {
                    alg: header.alg
                }
            });
    }
    const digest = await crypto.subtle.digest(algorithm, buf(data));
    return b64u(digest.slice(0, digest.byteLength / 2));
}
async function idTokenHashMatches(data, actual, header, claimName) {
    const expected = await idTokenHash(data, header, claimName);
    return actual === expected;
}
async function validateDetachedSignatureResponse(as, client, parameters, expectedNonce, expectedState, maxAge, options) {
    return validateHybridResponse(as, client, parameters, expectedNonce, expectedState, maxAge, options, true);
}
async function validateCodeIdTokenResponse(as, client, parameters, expectedNonce, expectedState, maxAge, options) {
    return validateHybridResponse(as, client, parameters, expectedNonce, expectedState, maxAge, options, false);
}
async function consumeStream(request) {
    if (request.bodyUsed) {
        throw CodedTypeError('form_post Request instances must contain a readable body', ERR_INVALID_ARG_VALUE, {
            cause: request
        });
    }
    return request.text();
}
async function formPostResponse(request) {
    if (request.method !== 'POST') {
        throw CodedTypeError('form_post responses are expected to use the POST method', ERR_INVALID_ARG_VALUE, {
            cause: request
        });
    }
    if (getContentType(request) !== 'application/x-www-form-urlencoded') {
        throw CodedTypeError('form_post responses are expected to use the application/x-www-form-urlencoded content-type', ERR_INVALID_ARG_VALUE, {
            cause: request
        });
    }
    return consumeStream(request);
}
async function validateHybridResponse(as, client, parameters, expectedNonce, expectedState, maxAge, options, fapi) {
    assertAs(as);
    assertClient(client);
    if (parameters instanceof URL) {
        if (!parameters.hash.length) {
            throw CodedTypeError('"parameters" as an instance of URL must contain a hash (fragment) with the Authorization Response parameters', ERR_INVALID_ARG_VALUE);
        }
        parameters = new URLSearchParams(parameters.hash.slice(1));
    } else if (looseInstanceOf(parameters, Request)) {
        parameters = new URLSearchParams(await formPostResponse(parameters));
    } else if (parameters instanceof URLSearchParams) {
        parameters = new URLSearchParams(parameters);
    } else {
        throw CodedTypeError('"parameters" must be an instance of URLSearchParams, URL, or Response', ERR_INVALID_ARG_TYPE);
    }
    const id_token = getURLSearchParameter(parameters, 'id_token');
    parameters.delete('id_token');
    switch(expectedState){
        case undefined:
        case expectNoState:
            break;
        default:
            assertString(expectedState, '"expectedState" argument');
    }
    const result = validateAuthResponse({
        ...as,
        authorization_response_iss_parameter_supported: false
    }, client, parameters, expectedState);
    if (!id_token) {
        throw OPE('"parameters" does not contain an ID Token', INVALID_RESPONSE);
    }
    const code = getURLSearchParameter(parameters, 'code');
    if (!code) {
        throw OPE('"parameters" does not contain an Authorization Code', INVALID_RESPONSE);
    }
    const requiredClaims = [
        'aud',
        'exp',
        'iat',
        'iss',
        'sub',
        'nonce',
        'c_hash'
    ];
    const state = parameters.get('state');
    if (fapi && (typeof expectedState === 'string' || state !== null)) {
        requiredClaims.push('s_hash');
    }
    if (maxAge !== undefined) {
        assertNumber(maxAge, false, '"maxAge" argument');
    } else if (client.default_max_age !== undefined) {
        assertNumber(client.default_max_age, false, '"client.default_max_age"');
    }
    maxAge ??= client.default_max_age ?? skipAuthTimeCheck;
    if (client.require_auth_time || maxAge !== skipAuthTimeCheck) {
        requiredClaims.push('auth_time');
    }
    const { claims, header, jwt } = await validateJwt(id_token, checkSigningAlgorithm.bind(undefined, client.id_token_signed_response_alg, as.id_token_signing_alg_values_supported, 'RS256'), getClockSkew(client), getClockTolerance(client), options?.[jweDecrypt]).then(validatePresence.bind(undefined, requiredClaims)).then(validateIssuer.bind(undefined, as)).then(validateAudience.bind(undefined, client.client_id));
    const clockSkew = getClockSkew(client);
    const now = epochTime() + clockSkew;
    if (claims.iat < now - 3600) {
        throw OPE('unexpected JWT "iat" (issued at) claim value, it is too far in the past', JWT_TIMESTAMP_CHECK, {
            now,
            claims,
            claim: 'iat'
        });
    }
    assertString(claims.c_hash, 'ID Token "c_hash" (code hash) claim value', INVALID_RESPONSE, {
        claims
    });
    if (claims.auth_time !== undefined) {
        assertNumber(claims.auth_time, false, 'ID Token "auth_time" (authentication time)', INVALID_RESPONSE, {
            claims
        });
    }
    if (maxAge !== skipAuthTimeCheck) {
        const now = epochTime() + getClockSkew(client);
        const tolerance = getClockTolerance(client);
        if (claims.auth_time + maxAge < now - tolerance) {
            throw OPE('too much time has elapsed since the last End-User authentication', JWT_TIMESTAMP_CHECK, {
                claims,
                now,
                tolerance,
                claim: 'auth_time'
            });
        }
    }
    assertString(expectedNonce, '"expectedNonce" argument');
    if (claims.nonce !== expectedNonce) {
        throw OPE('unexpected ID Token "nonce" claim value', JWT_CLAIM_COMPARISON, {
            expected: expectedNonce,
            claims,
            claim: 'nonce'
        });
    }
    if (Array.isArray(claims.aud) && claims.aud.length !== 1) {
        if (claims.azp === undefined) {
            throw OPE('ID Token "aud" (audience) claim includes additional untrusted audiences', JWT_CLAIM_COMPARISON, {
                claims,
                claim: 'aud'
            });
        }
        if (claims.azp !== client.client_id) {
            throw OPE('unexpected ID Token "azp" (authorized party) claim value', JWT_CLAIM_COMPARISON, {
                expected: client.client_id,
                claims,
                claim: 'azp'
            });
        }
    }
    const { 0: protectedHeader, 1: payload, 2: encodedSignature } = jwt.split('.');
    const signature = b64u(encodedSignature);
    const key = await getPublicSigKeyFromIssuerJwksUri(as, options, header);
    await validateJwsSignature(protectedHeader, payload, key, signature);
    if (await idTokenHashMatches(code, claims.c_hash, header, 'c_hash') !== true) {
        throw OPE('invalid ID Token "c_hash" (code hash) claim value', JWT_CLAIM_COMPARISON, {
            code,
            alg: header.alg,
            claim: 'c_hash',
            claims
        });
    }
    if (fapi && state !== null || claims.s_hash !== undefined) {
        assertString(claims.s_hash, 'ID Token "s_hash" (state hash) claim value', INVALID_RESPONSE, {
            claims
        });
        assertString(state, '"state" response parameter', INVALID_RESPONSE, {
            parameters
        });
        if (await idTokenHashMatches(state, claims.s_hash, header, 's_hash') !== true) {
            throw OPE('invalid ID Token "s_hash" (state hash) claim value', JWT_CLAIM_COMPARISON, {
                state,
                alg: header.alg,
                claim: 's_hash',
                claims
            });
        }
    }
    return result;
}
function checkSigningAlgorithm(client, issuer, fallback, header) {
    if (client !== undefined) {
        if (typeof client === 'string' ? header.alg !== client : !client.includes(header.alg)) {
            throw OPE('unexpected JWT "alg" header parameter', INVALID_RESPONSE, {
                header,
                expected: client,
                reason: 'client configuration'
            });
        }
        return;
    }
    if (Array.isArray(issuer)) {
        if (!issuer.includes(header.alg)) {
            throw OPE('unexpected JWT "alg" header parameter', INVALID_RESPONSE, {
                header,
                expected: issuer,
                reason: 'authorization server metadata'
            });
        }
        return;
    }
    if (fallback !== undefined) {
        if (typeof fallback === 'string' ? header.alg !== fallback : typeof fallback === 'function' ? !fallback(header.alg) : !fallback.includes(header.alg)) {
            throw OPE('unexpected JWT "alg" header parameter', INVALID_RESPONSE, {
                header,
                expected: fallback,
                reason: 'default value'
            });
        }
        return;
    }
    throw OPE('missing client or server configuration to verify used JWT "alg" header parameter', undefined, {
        client,
        issuer,
        fallback
    });
}
function getURLSearchParameter(parameters, name) {
    const { 0: value, length } = parameters.getAll(name);
    if (length > 1) {
        throw OPE(`"${name}" parameter must be provided only once`, INVALID_RESPONSE);
    }
    return value;
}
const skipStateCheck = Symbol();
const expectNoState = Symbol();
function validateAuthResponse(as, client, parameters, expectedState) {
    assertAs(as);
    assertClient(client);
    if (parameters instanceof URL) {
        parameters = parameters.searchParams;
    }
    if (!(parameters instanceof URLSearchParams)) {
        throw CodedTypeError('"parameters" must be an instance of URLSearchParams, or URL', ERR_INVALID_ARG_TYPE);
    }
    if (getURLSearchParameter(parameters, 'response')) {
        throw OPE('"parameters" contains a JARM response, use validateJwtAuthResponse() instead of validateAuthResponse()', INVALID_RESPONSE, {
            parameters
        });
    }
    const iss = getURLSearchParameter(parameters, 'iss');
    const state = getURLSearchParameter(parameters, 'state');
    if (!iss && as.authorization_response_iss_parameter_supported) {
        throw OPE('response parameter "iss" (issuer) missing', INVALID_RESPONSE, {
            parameters
        });
    }
    if (iss && iss !== as.issuer) {
        throw OPE('unexpected "iss" (issuer) response parameter value', INVALID_RESPONSE, {
            expected: as.issuer,
            parameters
        });
    }
    switch(expectedState){
        case undefined:
        case expectNoState:
            if (state !== undefined) {
                throw OPE('unexpected "state" response parameter encountered', INVALID_RESPONSE, {
                    expected: undefined,
                    parameters
                });
            }
            break;
        case skipStateCheck:
            break;
        default:
            assertString(expectedState, '"expectedState" argument');
            if (state !== expectedState) {
                throw OPE(state === undefined ? 'response parameter "state" missing' : 'unexpected "state" response parameter value', INVALID_RESPONSE, {
                    expected: expectedState,
                    parameters
                });
            }
    }
    const error = getURLSearchParameter(parameters, 'error');
    if (error) {
        throw new AuthorizationResponseError('authorization response from the server is an error', {
            cause: parameters
        });
    }
    const id_token = getURLSearchParameter(parameters, 'id_token');
    const token = getURLSearchParameter(parameters, 'token');
    if (id_token !== undefined || token !== undefined) {
        throw new UnsupportedOperationError('implicit and hybrid flows are not supported');
    }
    return brand(new URLSearchParams(parameters));
}
function algToSubtle(alg) {
    switch(alg){
        case 'PS256':
        case 'PS384':
        case 'PS512':
            return {
                name: 'RSA-PSS',
                hash: `SHA-${alg.slice(-3)}`
            };
        case 'RS256':
        case 'RS384':
        case 'RS512':
            return {
                name: 'RSASSA-PKCS1-v1_5',
                hash: `SHA-${alg.slice(-3)}`
            };
        case 'ES256':
        case 'ES384':
            return {
                name: 'ECDSA',
                namedCurve: `P-${alg.slice(-3)}`
            };
        case 'ES512':
            return {
                name: 'ECDSA',
                namedCurve: 'P-521'
            };
        case 'Ed25519':
        case 'EdDSA':
            return 'Ed25519';
        default:
            throw new UnsupportedOperationError('unsupported JWS algorithm', {
                cause: {
                    alg
                }
            });
    }
}
async function importJwk(alg, jwk) {
    const { ext, key_ops, use, ...key } = jwk;
    return crypto.subtle.importKey('jwk', key, algToSubtle(alg), true, [
        'verify'
    ]);
}
async function deviceAuthorizationRequest(as, client, clientAuthentication, parameters, options) {
    assertAs(as);
    assertClient(client);
    const url = resolveEndpoint(as, 'device_authorization_endpoint', client.use_mtls_endpoint_aliases, options?.[allowInsecureRequests] !== true);
    const body = new URLSearchParams(parameters);
    body.set('client_id', client.client_id);
    const headers = prepareHeaders(options?.headers);
    headers.set('accept', 'application/json');
    return authenticatedRequest(as, client, clientAuthentication, url, body, headers, options);
}
async function processDeviceAuthorizationResponse(as, client, response) {
    assertAs(as);
    assertClient(client);
    if (!looseInstanceOf(response, Response)) {
        throw CodedTypeError('"response" must be an instance of Response', ERR_INVALID_ARG_TYPE);
    }
    let challenges;
    if (challenges = parseWwwAuthenticateChallenges(response)) {
        throw new WWWAuthenticateChallengeError('server responded with a challenge in the WWW-Authenticate HTTP Header', {
            cause: challenges,
            response
        });
    }
    if (response.status !== 200) {
        let err;
        if (err = await handleOAuthBodyError(response)) {
            await response.body?.cancel();
            throw new ResponseBodyError('server responded with an error in the response body', {
                cause: err,
                response
            });
        }
        throw OPE('"response" is not a conform Device Authorization Endpoint response (unexpected HTTP status code)', RESPONSE_IS_NOT_CONFORM, response);
    }
    assertReadableResponse(response);
    assertApplicationJson(response);
    let json;
    try {
        json = await response.json();
    } catch (cause) {
        throw OPE('failed to parse "response" body as JSON', PARSE_ERROR, cause);
    }
    if (!isJsonObject(json)) {
        throw OPE('"response" body must be a top level object', INVALID_RESPONSE, {
            body: json
        });
    }
    assertString(json.device_code, '"response" body "device_code" property', INVALID_RESPONSE, {
        body: json
    });
    assertString(json.user_code, '"response" body "user_code" property', INVALID_RESPONSE, {
        body: json
    });
    assertString(json.verification_uri, '"response" body "verification_uri" property', INVALID_RESPONSE, {
        body: json
    });
    let expiresIn = typeof json.expires_in !== 'number' ? parseFloat(json.expires_in) : json.expires_in;
    assertNumber(expiresIn, false, '"response" body "expires_in" property', INVALID_RESPONSE, {
        body: json
    });
    json.expires_in = expiresIn;
    if (json.verification_uri_complete !== undefined) {
        assertString(json.verification_uri_complete, '"response" body "verification_uri_complete" property', INVALID_RESPONSE, {
            body: json
        });
    }
    if (json.interval !== undefined) {
        assertNumber(json.interval, false, '"response" body "interval" property', INVALID_RESPONSE, {
            body: json
        });
    }
    return json;
}
async function deviceCodeGrantRequest(as, client, clientAuthentication, deviceCode, options) {
    assertAs(as);
    assertClient(client);
    assertString(deviceCode, '"deviceCode"');
    const parameters = new URLSearchParams(options?.additionalParameters);
    parameters.set('device_code', deviceCode);
    return tokenEndpointRequest(as, client, clientAuthentication, 'urn:ietf:params:oauth:grant-type:device_code', parameters, options);
}
async function processDeviceCodeResponse(as, client, response, options) {
    return processGenericAccessTokenResponse(as, client, response, undefined, options);
}
async function generateKeyPair(alg, options) {
    assertString(alg, '"alg"');
    const algorithm = algToSubtle(alg);
    if (alg.startsWith('PS') || alg.startsWith('RS')) {
        Object.assign(algorithm, {
            modulusLength: options?.modulusLength ?? 2048,
            publicExponent: new Uint8Array([
                0x01,
                0x00,
                0x01
            ])
        });
    }
    return crypto.subtle.generateKey(algorithm, options?.extractable ?? false, [
        'sign',
        'verify'
    ]);
}
function normalizeHtu(htu) {
    const url = new URL(htu);
    url.search = '';
    url.hash = '';
    return url.href;
}
async function validateDPoP(request, accessToken, accessTokenClaims, options) {
    const headerValue = request.headers.get('dpop');
    if (headerValue === null) {
        throw OPE('operation indicated DPoP use but the request has no DPoP HTTP Header', INVALID_REQUEST, {
            headers: request.headers
        });
    }
    if (request.headers.get('authorization')?.toLowerCase().startsWith('dpop ') === false) {
        throw OPE(`operation indicated DPoP use but the request's Authorization HTTP Header scheme is not DPoP`, INVALID_REQUEST, {
            headers: request.headers
        });
    }
    if (typeof accessTokenClaims.cnf?.jkt !== 'string') {
        throw OPE('operation indicated DPoP use but the JWT Access Token has no jkt confirmation claim', INVALID_REQUEST, {
            claims: accessTokenClaims
        });
    }
    const clockSkew = getClockSkew(options);
    const proof = await validateJwt(headerValue, checkSigningAlgorithm.bind(undefined, options?.signingAlgorithms, undefined, supported), clockSkew, getClockTolerance(options), undefined).then(checkJwtType.bind(undefined, 'dpop+jwt')).then(validatePresence.bind(undefined, [
        'iat',
        'jti',
        'ath',
        'htm',
        'htu'
    ]));
    const now = epochTime() + clockSkew;
    const diff = Math.abs(now - proof.claims.iat);
    if (diff > 300) {
        throw OPE('DPoP Proof iat is not recent enough', JWT_TIMESTAMP_CHECK, {
            now,
            claims: proof.claims,
            claim: 'iat'
        });
    }
    if (proof.claims.htm !== request.method) {
        throw OPE('DPoP Proof htm mismatch', JWT_CLAIM_COMPARISON, {
            expected: request.method,
            claims: proof.claims,
            claim: 'htm'
        });
    }
    if (typeof proof.claims.htu !== 'string' || normalizeHtu(proof.claims.htu) !== normalizeHtu(request.url)) {
        throw OPE('DPoP Proof htu mismatch', JWT_CLAIM_COMPARISON, {
            expected: normalizeHtu(request.url),
            claims: proof.claims,
            claim: 'htu'
        });
    }
    {
        const expected = b64u(await crypto.subtle.digest('SHA-256', buf(accessToken)));
        if (proof.claims.ath !== expected) {
            throw OPE('DPoP Proof ath mismatch', JWT_CLAIM_COMPARISON, {
                expected,
                claims: proof.claims,
                claim: 'ath'
            });
        }
    }
    {
        let components;
        switch(proof.header.jwk.kty){
            case 'EC':
                components = {
                    crv: proof.header.jwk.crv,
                    kty: proof.header.jwk.kty,
                    x: proof.header.jwk.x,
                    y: proof.header.jwk.y
                };
                break;
            case 'OKP':
                components = {
                    crv: proof.header.jwk.crv,
                    kty: proof.header.jwk.kty,
                    x: proof.header.jwk.x
                };
                break;
            case 'RSA':
                components = {
                    e: proof.header.jwk.e,
                    kty: proof.header.jwk.kty,
                    n: proof.header.jwk.n
                };
                break;
            default:
                throw new UnsupportedOperationError('unsupported JWK key type', {
                    cause: proof.header.jwk
                });
        }
        const expected = b64u(await crypto.subtle.digest('SHA-256', buf(JSON.stringify(components))));
        if (accessTokenClaims.cnf.jkt !== expected) {
            throw OPE('JWT Access Token confirmation mismatch', JWT_CLAIM_COMPARISON, {
                expected,
                claims: accessTokenClaims,
                claim: 'cnf.jkt'
            });
        }
    }
    const { 0: protectedHeader, 1: payload, 2: encodedSignature } = headerValue.split('.');
    const signature = b64u(encodedSignature);
    const { jwk, alg } = proof.header;
    if (!jwk) {
        throw OPE('DPoP Proof is missing the jwk header parameter', INVALID_REQUEST, {
            header: proof.header
        });
    }
    const key = await importJwk(alg, jwk);
    if (key.type !== 'public') {
        throw OPE('DPoP Proof jwk header parameter must contain a public key', INVALID_REQUEST, {
            header: proof.header
        });
    }
    await validateJwsSignature(protectedHeader, payload, key, signature);
}
async function validateJwtAccessToken(as, request, expectedAudience, options) {
    assertAs(as);
    if (!looseInstanceOf(request, Request)) {
        throw CodedTypeError('"request" must be an instance of Request', ERR_INVALID_ARG_TYPE);
    }
    assertString(expectedAudience, '"expectedAudience"');
    const authorization = request.headers.get('authorization');
    if (authorization === null) {
        throw OPE('"request" is missing an Authorization HTTP Header', INVALID_REQUEST, {
            headers: request.headers
        });
    }
    let { 0: scheme, 1: accessToken, length } = authorization.split(' ');
    scheme = scheme.toLowerCase();
    switch(scheme){
        case 'dpop':
        case 'bearer':
            break;
        default:
            throw new UnsupportedOperationError('unsupported Authorization HTTP Header scheme', {
                cause: {
                    headers: request.headers
                }
            });
    }
    if (length !== 2) {
        throw OPE('invalid Authorization HTTP Header format', INVALID_REQUEST, {
            headers: request.headers
        });
    }
    const requiredClaims = [
        'iss',
        'exp',
        'aud',
        'sub',
        'iat',
        'jti',
        'client_id'
    ];
    if (options?.requireDPoP || scheme === 'dpop' || request.headers.has('dpop')) {
        requiredClaims.push('cnf');
    }
    const { claims, header } = await validateJwt(accessToken, checkSigningAlgorithm.bind(undefined, options?.signingAlgorithms, undefined, supported), getClockSkew(options), getClockTolerance(options), undefined).then(checkJwtType.bind(undefined, 'at+jwt')).then(validatePresence.bind(undefined, requiredClaims)).then(validateIssuer.bind(undefined, as)).then(validateAudience.bind(undefined, expectedAudience)).catch(reassignRSCode);
    for (const claim of [
        'client_id',
        'jti',
        'sub'
    ]){
        if (typeof claims[claim] !== 'string') {
            throw OPE(`unexpected JWT "${claim}" claim type`, INVALID_REQUEST, {
                claims
            });
        }
    }
    if ('cnf' in claims) {
        if (!isJsonObject(claims.cnf)) {
            throw OPE('unexpected JWT "cnf" (confirmation) claim value', INVALID_REQUEST, {
                claims
            });
        }
        const { 0: cnf, length } = Object.keys(claims.cnf);
        if (length) {
            if (length !== 1) {
                throw new UnsupportedOperationError('multiple confirmation claims are not supported', {
                    cause: {
                        claims
                    }
                });
            }
            if (cnf !== 'jkt') {
                throw new UnsupportedOperationError('unsupported JWT Confirmation method', {
                    cause: {
                        claims
                    }
                });
            }
        }
    }
    const { 0: protectedHeader, 1: payload, 2: encodedSignature } = accessToken.split('.');
    const signature = b64u(encodedSignature);
    const key = await getPublicSigKeyFromIssuerJwksUri(as, options, header);
    await validateJwsSignature(protectedHeader, payload, key, signature);
    if (options?.requireDPoP || scheme === 'dpop' || claims.cnf?.jkt !== undefined || request.headers.has('dpop')) {
        await validateDPoP(request, accessToken, claims, options).catch(reassignRSCode);
    }
    return claims;
}
function reassignRSCode(err) {
    if (err instanceof OperationProcessingError && err?.code === INVALID_REQUEST) {
        err.code = INVALID_RESPONSE;
    }
    throw err;
}
const _nopkce = Symbol();
const _nodiscoverycheck = Symbol();
const _expectedIssuer = Symbol(); //# sourceMappingURL=index.js.map
}}),
"[project]/node_modules/@auth/core/lib/actions/callback/oauth/checks.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "nonce": (()=>nonce),
    "pkce": (()=>pkce),
    "state": (()=>state),
    "webauthnChallenge": (()=>webauthnChallenge)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@auth/core/errors.js [middleware] (ecmascript)");
// NOTE: We use the default JWT methods here because they encrypt/decrypt the payload, not just sign it.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$jwt$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@auth/core/jwt.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$oauth4webapi$2f$build$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/oauth4webapi/build/index.js [middleware] (ecmascript)");
;
;
;
const COOKIE_TTL = 60 * 15; // 15 minutes
/** Returns a cookie with a JWT encrypted payload. */ async function sealCookie(name, payload, options) {
    const { cookies, logger } = options;
    const cookie = cookies[name];
    const expires = new Date();
    expires.setTime(expires.getTime() + COOKIE_TTL * 1000);
    logger.debug(`CREATE_${name.toUpperCase()}`, {
        name: cookie.name,
        payload,
        COOKIE_TTL,
        expires
    });
    const encoded = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$jwt$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["encode"])({
        ...options.jwt,
        maxAge: COOKIE_TTL,
        token: {
            value: payload
        },
        salt: cookie.name
    });
    const cookieOptions = {
        ...cookie.options,
        expires
    };
    return {
        name: cookie.name,
        value: encoded,
        options: cookieOptions
    };
}
async function parseCookie(name, value, options) {
    try {
        const { logger, cookies, jwt } = options;
        logger.debug(`PARSE_${name.toUpperCase()}`, {
            cookie: value
        });
        if (!value) throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["InvalidCheck"](`${name} cookie was missing`);
        const parsed = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$jwt$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["decode"])({
            ...jwt,
            token: value,
            salt: cookies[name].name
        });
        if (parsed?.value) return parsed.value;
        throw new Error("Invalid cookie");
    } catch (error) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["InvalidCheck"](`${name} value could not be parsed`, {
            cause: error
        });
    }
}
function clearCookie(name, options, resCookies) {
    const { logger, cookies } = options;
    const cookie = cookies[name];
    logger.debug(`CLEAR_${name.toUpperCase()}`, {
        cookie
    });
    resCookies.push({
        name: cookie.name,
        value: "",
        options: {
            ...cookies[name].options,
            maxAge: 0
        }
    });
}
function useCookie(check, name) {
    return async function(cookies, resCookies, options) {
        const { provider, logger } = options;
        if (!provider?.checks?.includes(check)) return;
        const cookieValue = cookies?.[options.cookies[name].name];
        logger.debug(`USE_${name.toUpperCase()}`, {
            value: cookieValue
        });
        const parsed = await parseCookie(name, cookieValue, options);
        clearCookie(name, options, resCookies);
        return parsed;
    };
}
const pkce = {
    /** Creates a PKCE code challenge and verifier pair. The verifier in stored in the cookie. */ async create (options) {
        const code_verifier = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$oauth4webapi$2f$build$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__.generateRandomCodeVerifier();
        const value = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$oauth4webapi$2f$build$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__.calculatePKCECodeChallenge(code_verifier);
        const cookie = await sealCookie("pkceCodeVerifier", code_verifier, options);
        return {
            cookie,
            value
        };
    },
    /**
     * Returns code_verifier if the provider is configured to use PKCE,
     * and clears the container cookie afterwards.
     * An error is thrown if the code_verifier is missing or invalid.
     */ use: useCookie("pkce", "pkceCodeVerifier")
};
const STATE_MAX_AGE = 60 * 15; // 15 minutes in seconds
const encodedStateSalt = "encodedState";
const state = {
    /** Creates a state cookie with an optionally encoded body. */ async create (options, origin) {
        const { provider } = options;
        if (!provider.checks.includes("state")) {
            if (origin) {
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["InvalidCheck"]("State data was provided but the provider is not configured to use state");
            }
            return;
        }
        // IDEA: Allow the user to pass data to be stored in the state
        const payload = {
            origin,
            random: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$oauth4webapi$2f$build$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__.generateRandomState()
        };
        const value = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$jwt$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["encode"])({
            secret: options.jwt.secret,
            token: payload,
            salt: encodedStateSalt,
            maxAge: STATE_MAX_AGE
        });
        const cookie = await sealCookie("state", value, options);
        return {
            cookie,
            value
        };
    },
    /**
     * Returns state if the provider is configured to use state,
     * and clears the container cookie afterwards.
     * An error is thrown if the state is missing or invalid.
     */ use: useCookie("state", "state"),
    /** Decodes the state. If it could not be decoded, it throws an error. */ async decode (state, options) {
        try {
            options.logger.debug("DECODE_STATE", {
                state
            });
            const payload = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$jwt$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["decode"])({
                secret: options.jwt.secret,
                token: state,
                salt: encodedStateSalt
            });
            if (payload) return payload;
            throw new Error("Invalid state");
        } catch (error) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["InvalidCheck"]("State could not be decoded", {
                cause: error
            });
        }
    }
};
const nonce = {
    async create (options) {
        if (!options.provider.checks.includes("nonce")) return;
        const value = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$oauth4webapi$2f$build$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__.generateRandomNonce();
        const cookie = await sealCookie("nonce", value, options);
        return {
            cookie,
            value
        };
    },
    /**
     * Returns nonce if the provider is configured to use nonce,
     * and clears the container cookie afterwards.
     * An error is thrown if the nonce is missing or invalid.
     * @see https://openid.net/specs/openid-connect-core-1_0.html#NonceNotes
     * @see https://danielfett.de/2020/05/16/pkce-vs-nonce-equivalent-or-not/#nonce
     */ use: useCookie("nonce", "nonce")
};
const WEBAUTHN_CHALLENGE_MAX_AGE = 60 * 15; // 15 minutes in seconds
const webauthnChallengeSalt = "encodedWebauthnChallenge";
const webauthnChallenge = {
    async create (options, challenge, registerData) {
        return {
            cookie: await sealCookie("webauthnChallenge", await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$jwt$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["encode"])({
                secret: options.jwt.secret,
                token: {
                    challenge,
                    registerData
                },
                salt: webauthnChallengeSalt,
                maxAge: WEBAUTHN_CHALLENGE_MAX_AGE
            }), options)
        };
    },
    /** Returns WebAuthn challenge if present. */ async use (options, cookies, resCookies) {
        const cookieValue = cookies?.[options.cookies.webauthnChallenge.name];
        const parsed = await parseCookie("webauthnChallenge", cookieValue, options);
        const payload = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$jwt$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["decode"])({
            secret: options.jwt.secret,
            token: parsed,
            salt: webauthnChallengeSalt
        });
        // Clear the WebAuthn challenge cookie after use
        clearCookie("webauthnChallenge", options, resCookies);
        if (!payload) throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["InvalidCheck"]("WebAuthn challenge was missing");
        return payload;
    }
};
}}),
"[project]/node_modules/jose/dist/browser/util/decode_jwt.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "decodeJwt": (()=>decodeJwt)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/util/errors.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$base64url$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/util/base64url.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$buffer_utils$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/lib/buffer_utils.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$is_object$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/lib/is_object.js [middleware] (ecmascript)");
;
;
;
;
function decodeJwt(jwt) {
    if (typeof jwt !== 'string') throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["JWTInvalid"]('JWTs must use Compact JWS serialization, JWT must be a string');
    const { 1: payload, length } = jwt.split('.');
    if (length === 5) throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["JWTInvalid"]('Only JWTs using Compact JWS serialization can be decoded');
    if (length !== 3) throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["JWTInvalid"]('Invalid JWT');
    if (!payload) throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["JWTInvalid"]('JWTs must contain a payload');
    let decoded;
    try {
        decoded = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$base64url$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["decode"])(payload);
    } catch  {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["JWTInvalid"]('Failed to base64url decode the payload');
    }
    let result;
    try {
        result = JSON.parse(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$buffer_utils$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["decoder"].decode(decoded));
    } catch  {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["JWTInvalid"]('Failed to parse the decoded payload as JSON');
    }
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$lib$2f$is_object$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"])(result)) throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["JWTInvalid"]('Invalid JWT Claims Set');
    return result;
}
}}),
"[project]/node_modules/@auth/core/lib/actions/callback/oauth/callback.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "getUserAndAccount": (()=>getUserAndAccount),
    "handleOAuth": (()=>handleOAuth)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$actions$2f$callback$2f$oauth$2f$checks$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@auth/core/lib/actions/callback/oauth/checks.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@auth/core/errors.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$utils$2f$providers$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@auth/core/lib/utils/providers.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$symbols$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@auth/core/lib/symbols.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$oauth4webapi$2f$build$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/oauth4webapi/build/index.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$decode_jwt$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/jose/dist/browser/util/decode_jwt.js [middleware] (ecmascript)");
;
;
;
;
;
;
function formUrlEncode(token) {
    return encodeURIComponent(token).replace(/%20/g, "+");
}
/**
 * Formats client_id and client_secret as an HTTP Basic Authentication header as per the OAuth 2.0
 * specified in RFC6749.
 */ function clientSecretBasic(clientId, clientSecret) {
    const username = formUrlEncode(clientId);
    const password = formUrlEncode(clientSecret);
    const credentials = btoa(`${username}:${password}`);
    return `Basic ${credentials}`;
}
async function handleOAuth(params, cookies, options) {
    const { logger, provider } = options;
    let as;
    const { token, userinfo } = provider;
    // Falls back to authjs.dev if the user only passed params
    if ((!token?.url || token.url.host === "authjs.dev") && (!userinfo?.url || userinfo.url.host === "authjs.dev")) {
        // We assume that issuer is always defined as this has been asserted earlier
        const issuer = new URL(provider.issuer);
        const discoveryResponse = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$oauth4webapi$2f$build$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__.discoveryRequest(issuer, {
            [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$oauth4webapi$2f$build$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__.allowInsecureRequests]: true,
            [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$oauth4webapi$2f$build$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__.customFetch]: provider[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$symbols$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["customFetch"]]
        });
        as = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$oauth4webapi$2f$build$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__.processDiscoveryResponse(issuer, discoveryResponse);
        if (!as.token_endpoint) throw new TypeError("TODO: Authorization server did not provide a token endpoint.");
        if (!as.userinfo_endpoint) throw new TypeError("TODO: Authorization server did not provide a userinfo endpoint.");
    } else {
        as = {
            issuer: provider.issuer ?? "https://authjs.dev",
            token_endpoint: token?.url.toString(),
            userinfo_endpoint: userinfo?.url.toString()
        };
    }
    const client = {
        client_id: provider.clientId,
        ...provider.client
    };
    let clientAuth;
    switch(client.token_endpoint_auth_method){
        // TODO: in the next breaking major version have undefined be `client_secret_post`
        case undefined:
        case "client_secret_basic":
            // TODO: in the next breaking major version use o.ClientSecretBasic() here
            clientAuth = (_as, _client, _body, headers)=>{
                headers.set("authorization", clientSecretBasic(provider.clientId, provider.clientSecret));
            };
            break;
        case "client_secret_post":
            clientAuth = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$oauth4webapi$2f$build$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__.ClientSecretPost(provider.clientSecret);
            break;
        case "client_secret_jwt":
            clientAuth = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$oauth4webapi$2f$build$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__.ClientSecretJwt(provider.clientSecret);
            break;
        case "private_key_jwt":
            clientAuth = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$oauth4webapi$2f$build$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__.PrivateKeyJwt(provider.token.clientPrivateKey, {
                // TODO: review in the next breaking change
                [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$oauth4webapi$2f$build$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__.modifyAssertion] (_header, payload) {
                    payload.aud = [
                        as.issuer,
                        as.token_endpoint
                    ];
                }
            });
            break;
        case "none":
            clientAuth = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$oauth4webapi$2f$build$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__.None();
            break;
        default:
            throw new Error("unsupported client authentication method");
    }
    const resCookies = [];
    const state = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$actions$2f$callback$2f$oauth$2f$checks$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__.state.use(cookies, resCookies, options);
    let codeGrantParams;
    try {
        codeGrantParams = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$oauth4webapi$2f$build$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__.validateAuthResponse(as, client, new URLSearchParams(params), provider.checks.includes("state") ? state : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$oauth4webapi$2f$build$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__.skipStateCheck);
    } catch (err) {
        if (err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$oauth4webapi$2f$build$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__.AuthorizationResponseError) {
            const cause = {
                providerId: provider.id,
                ...Object.fromEntries(err.cause.entries())
            };
            logger.debug("OAuthCallbackError", cause);
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["OAuthCallbackError"]("OAuth Provider returned an error", cause);
        }
        throw err;
    }
    const codeVerifier = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$actions$2f$callback$2f$oauth$2f$checks$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__.pkce.use(cookies, resCookies, options);
    let redirect_uri = provider.callbackUrl;
    if (!options.isOnRedirectProxy && provider.redirectProxyUrl) {
        redirect_uri = provider.redirectProxyUrl;
    }
    let codeGrantResponse = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$oauth4webapi$2f$build$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__.authorizationCodeGrantRequest(as, client, clientAuth, codeGrantParams, redirect_uri, codeVerifier ?? "decoy", {
        // TODO: move away from allowing insecure HTTP requests
        [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$oauth4webapi$2f$build$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__.allowInsecureRequests]: true,
        [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$oauth4webapi$2f$build$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__.customFetch]: (...args)=>{
            if (!provider.checks.includes("pkce")) {
                args[1].body.delete("code_verifier");
            }
            return (provider[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$symbols$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["customFetch"]] ?? fetch)(...args);
        }
    });
    if (provider.token?.conform) {
        codeGrantResponse = await provider.token.conform(codeGrantResponse.clone()) ?? codeGrantResponse;
    }
    let profile = {};
    const requireIdToken = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$utils$2f$providers$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["isOIDCProvider"])(provider);
    if (provider[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$symbols$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["conformInternal"]]) {
        switch(provider.id){
            case "microsoft-entra-id":
            case "azure-ad":
                {
                    /**
                 * These providers need the authorization server metadata to be re-processed
                 * based on the `id_token`'s `tid` claim
                 * @see https://github.com/MicrosoftDocs/azure-docs/issues/113944
                 */ const { tid } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$browser$2f$util$2f$decode_jwt$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["decodeJwt"])((await codeGrantResponse.clone().json()).id_token);
                    if (typeof tid === "string") {
                        const tenantRe = /microsoftonline\.com\/(\w+)\/v2\.0/;
                        const tenantId = as.issuer?.match(tenantRe)?.[1] ?? "common";
                        const issuer = new URL(as.issuer.replace(tenantId, tid));
                        const discoveryResponse = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$oauth4webapi$2f$build$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__.discoveryRequest(issuer, {
                            [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$oauth4webapi$2f$build$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__.customFetch]: provider[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$symbols$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["customFetch"]]
                        });
                        as = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$oauth4webapi$2f$build$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__.processDiscoveryResponse(issuer, discoveryResponse);
                    }
                    break;
                }
            default:
                break;
        }
    }
    const processedCodeResponse = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$oauth4webapi$2f$build$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__.processAuthorizationCodeResponse(as, client, codeGrantResponse, {
        expectedNonce: await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$actions$2f$callback$2f$oauth$2f$checks$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__.nonce.use(cookies, resCookies, options),
        requireIdToken
    });
    const tokens = processedCodeResponse;
    if (requireIdToken) {
        const idTokenClaims = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$oauth4webapi$2f$build$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__.getValidatedIdTokenClaims(processedCodeResponse);
        profile = idTokenClaims;
        // Apple sends some of the user information in a `user` parameter as a stringified JSON.
        // It also only does so the first time the user consents to share their information.
        if (provider[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$symbols$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["conformInternal"]] && provider.id === "apple") {
            try {
                profile.user = JSON.parse(params?.user);
            } catch  {}
        }
        if (provider.idToken === false) {
            const userinfoResponse = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$oauth4webapi$2f$build$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__.userInfoRequest(as, client, processedCodeResponse.access_token, {
                [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$oauth4webapi$2f$build$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__.customFetch]: provider[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$symbols$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["customFetch"]],
                // TODO: move away from allowing insecure HTTP requests
                [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$oauth4webapi$2f$build$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__.allowInsecureRequests]: true
            });
            profile = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$oauth4webapi$2f$build$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__.processUserInfoResponse(as, client, idTokenClaims.sub, userinfoResponse);
        }
    } else {
        if (userinfo?.request) {
            const _profile = await userinfo.request({
                tokens,
                provider
            });
            if (_profile instanceof Object) profile = _profile;
        } else if (userinfo?.url) {
            const userinfoResponse = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$oauth4webapi$2f$build$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__.userInfoRequest(as, client, processedCodeResponse.access_token, {
                [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$oauth4webapi$2f$build$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__.customFetch]: provider[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$symbols$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["customFetch"]]
            });
            profile = await userinfoResponse.json();
        } else {
            throw new TypeError("No userinfo endpoint configured");
        }
    }
    if (tokens.expires_in) {
        tokens.expires_at = Math.floor(Date.now() / 1000) + Number(tokens.expires_in);
    }
    const profileResult = await getUserAndAccount(profile, provider, tokens, logger);
    return {
        ...profileResult,
        profile,
        cookies: resCookies
    };
}
async function getUserAndAccount(OAuthProfile, provider, tokens, logger) {
    try {
        const userFromProfile = await provider.profile(OAuthProfile, tokens);
        const user = {
            ...userFromProfile,
            id: crypto.randomUUID(),
            email: userFromProfile.email?.toLowerCase()
        };
        return {
            user,
            account: {
                ...tokens,
                provider: provider.id,
                type: provider.type,
                providerAccountId: userFromProfile.id ?? crypto.randomUUID()
            }
        };
    } catch (e) {
        // If we didn't get a response either there was a problem with the provider
        // response *or* the user cancelled the action with the provider.
        //
        // Unfortunately, we can't tell which - at least not in a way that works for
        // all providers, so we return an empty object; the user should then be
        // redirected back to the sign up page. We log the error to help developers
        // who might be trying to debug this when configuring a new provider.
        logger.debug("getProfile error details", OAuthProfile);
        logger.error(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["OAuthProfileParseError"](e, {
            provider: provider.id
        }));
    }
}
}}),
"[project]/node_modules/@auth/core/lib/utils/webauthn-utils.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "assertInternalOptionsWebAuthn": (()=>assertInternalOptionsWebAuthn),
    "fromBase64": (()=>fromBase64),
    "getAuthenticationResponse": (()=>getAuthenticationResponse),
    "getRegistrationResponse": (()=>getRegistrationResponse),
    "inferWebAuthnOptions": (()=>inferWebAuthnOptions),
    "stringToTransports": (()=>stringToTransports),
    "toBase64": (()=>toBase64),
    "transportsToString": (()=>transportsToString),
    "verifyAuthenticate": (()=>verifyAuthenticate),
    "verifyRegister": (()=>verifyRegister)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@auth/core/errors.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$actions$2f$callback$2f$oauth$2f$checks$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@auth/core/lib/actions/callback/oauth/checks.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$utils$2f$web$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@auth/core/lib/utils/web.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$__$5b$external$5d$__$28$node$3a$buffer$2c$__cjs$29$__ = __turbopack_import__("[externals]/ [external] (node:buffer, cjs)");
;
;
;
function inferWebAuthnOptions(action, loggedIn, userInfoResponse) {
    const { user, exists = false } = userInfoResponse ?? {};
    switch(action){
        case "authenticate":
            {
                /**
             * Always allow explicit authentication requests.
             */ return "authenticate";
            }
        case "register":
            {
                /**
             * Registration is only allowed if:
             * - The user is logged in, meaning the user wants to register a new authenticator.
             * - The user is not logged in and provided user info that does NOT exist, meaning the user wants to register a new account.
             */ if (user && loggedIn === exists) return "register";
                break;
            }
        case undefined:
            {
                /**
             * When no explicit action is provided, we try to infer it based on the user info provided. These are the possible cases:
             * - Logged in users must always send an explit action, so we bail out in this case.
             * - Otherwise, if no user info is provided, the desired action is authentication without pre-defined authenticators.
             * - Otherwise, if the user info provided is of an existing user, the desired action is authentication with their pre-defined authenticators.
             * - Finally, if the user info provided is of a non-existing user, the desired action is registration.
             */ if (!loggedIn) {
                    if (user) {
                        if (exists) {
                            return "authenticate";
                        } else {
                            return "register";
                        }
                    } else {
                        return "authenticate";
                    }
                }
                break;
            }
    }
    // No decision could be made
    return null;
}
async function getRegistrationResponse(options, request, user, resCookies) {
    // Get registration options
    const regOptions = await getRegistrationOptions(options, request, user);
    // Get signed cookie
    const { cookie } = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$actions$2f$callback$2f$oauth$2f$checks$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["webauthnChallenge"].create(options, regOptions.challenge, user);
    return {
        status: 200,
        cookies: [
            ...resCookies ?? [],
            cookie
        ],
        body: {
            action: "register",
            options: regOptions
        },
        headers: {
            "Content-Type": "application/json"
        }
    };
}
async function getAuthenticationResponse(options, request, user, resCookies) {
    // Get authentication options
    const authOptions = await getAuthenticationOptions(options, request, user);
    // Get signed cookie
    const { cookie } = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$actions$2f$callback$2f$oauth$2f$checks$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["webauthnChallenge"].create(options, authOptions.challenge);
    return {
        status: 200,
        cookies: [
            ...resCookies ?? [],
            cookie
        ],
        body: {
            action: "authenticate",
            options: authOptions
        },
        headers: {
            "Content-Type": "application/json"
        }
    };
}
async function verifyAuthenticate(options, request, resCookies) {
    const { adapter, provider } = options;
    // Get WebAuthn response from request body
    const data = request.body && typeof request.body.data === "string" ? JSON.parse(request.body.data) : undefined;
    if (!data || typeof data !== "object" || !("id" in data) || typeof data.id !== "string") {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["AuthError"]("Invalid WebAuthn Authentication response");
    }
    // Reset the ID so we smooth out implementation differences
    const credentialID = toBase64(fromBase64(data.id));
    // Get authenticator from database
    const authenticator = await adapter.getAuthenticator(credentialID);
    if (!authenticator) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["AuthError"](`WebAuthn authenticator not found in database: ${JSON.stringify({
            credentialID
        })}`);
    }
    // Get challenge from request cookies
    const { challenge: expectedChallenge } = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$actions$2f$callback$2f$oauth$2f$checks$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["webauthnChallenge"].use(options, request.cookies, resCookies);
    // Verify the response
    let verification;
    try {
        const relayingParty = provider.getRelayingParty(options, request);
        verification = await provider.simpleWebAuthn.verifyAuthenticationResponse({
            ...provider.verifyAuthenticationOptions,
            expectedChallenge,
            response: data,
            authenticator: fromAdapterAuthenticator(authenticator),
            expectedOrigin: relayingParty.origin,
            expectedRPID: relayingParty.id
        });
    } catch (e) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["WebAuthnVerificationError"](e);
    }
    const { verified, authenticationInfo } = verification;
    // Make sure the response was verified
    if (!verified) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["WebAuthnVerificationError"]("WebAuthn authentication response could not be verified");
    }
    // Update authenticator counter
    try {
        const { newCounter } = authenticationInfo;
        await adapter.updateAuthenticatorCounter(authenticator.credentialID, newCounter);
    } catch (e) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["AdapterError"](`Failed to update authenticator counter. This may cause future authentication attempts to fail. ${JSON.stringify({
            credentialID,
            oldCounter: authenticator.counter,
            newCounter: authenticationInfo.newCounter
        })}`, e);
    }
    // Get the account and user
    const account = await adapter.getAccount(authenticator.providerAccountId, provider.id);
    if (!account) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["AuthError"](`WebAuthn account not found in database: ${JSON.stringify({
            credentialID,
            providerAccountId: authenticator.providerAccountId
        })}`);
    }
    const user = await adapter.getUser(account.userId);
    if (!user) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["AuthError"](`WebAuthn user not found in database: ${JSON.stringify({
            credentialID,
            providerAccountId: authenticator.providerAccountId,
            userID: account.userId
        })}`);
    }
    return {
        account,
        user
    };
}
async function verifyRegister(options, request, resCookies) {
    const { provider } = options;
    // Get WebAuthn response from request body
    const data = request.body && typeof request.body.data === "string" ? JSON.parse(request.body.data) : undefined;
    if (!data || typeof data !== "object" || !("id" in data) || typeof data.id !== "string") {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["AuthError"]("Invalid WebAuthn Registration response");
    }
    // Get challenge from request cookies
    const { challenge: expectedChallenge, registerData: user } = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$actions$2f$callback$2f$oauth$2f$checks$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["webauthnChallenge"].use(options, request.cookies, resCookies);
    if (!user) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["AuthError"]("Missing user registration data in WebAuthn challenge cookie");
    }
    // Verify the response
    let verification;
    try {
        const relayingParty = provider.getRelayingParty(options, request);
        verification = await provider.simpleWebAuthn.verifyRegistrationResponse({
            ...provider.verifyRegistrationOptions,
            expectedChallenge,
            response: data,
            expectedOrigin: relayingParty.origin,
            expectedRPID: relayingParty.id
        });
    } catch (e) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["WebAuthnVerificationError"](e);
    }
    // Make sure the response was verified
    if (!verification.verified || !verification.registrationInfo) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["WebAuthnVerificationError"]("WebAuthn registration response could not be verified");
    }
    // Build a new account
    const account = {
        providerAccountId: toBase64(verification.registrationInfo.credentialID),
        provider: options.provider.id,
        type: provider.type
    };
    // Build a new authenticator
    const authenticator = {
        providerAccountId: account.providerAccountId,
        counter: verification.registrationInfo.counter,
        credentialID: toBase64(verification.registrationInfo.credentialID),
        credentialPublicKey: toBase64(verification.registrationInfo.credentialPublicKey),
        credentialBackedUp: verification.registrationInfo.credentialBackedUp,
        credentialDeviceType: verification.registrationInfo.credentialDeviceType,
        transports: transportsToString(data.response.transports)
    };
    // Return created stuff
    return {
        user,
        account,
        authenticator
    };
}
/**
 * Generates WebAuthn authentication options.
 *
 * @param options - The internal options for WebAuthn.
 * @param request - The request object.
 * @param user - Optional user information.
 * @returns The authentication options.
 */ async function getAuthenticationOptions(options, request, user) {
    const { provider, adapter } = options;
    // Get the user's authenticators.
    const authenticators = user && user["id"] ? await adapter.listAuthenticatorsByUserId(user.id) : null;
    const relayingParty = provider.getRelayingParty(options, request);
    // Return the authentication options.
    return await provider.simpleWebAuthn.generateAuthenticationOptions({
        ...provider.authenticationOptions,
        rpID: relayingParty.id,
        allowCredentials: authenticators?.map((a)=>({
                id: fromBase64(a.credentialID),
                type: "public-key",
                transports: stringToTransports(a.transports)
            }))
    });
}
/**
 * Generates WebAuthn registration options.
 *
 * @param options - The internal options for WebAuthn.
 * @param request - The request object.
 * @param user - The user information.
 * @returns The registration options.
 */ async function getRegistrationOptions(options, request, user) {
    const { provider, adapter } = options;
    // Get the user's authenticators.
    const authenticators = user["id"] ? await adapter.listAuthenticatorsByUserId(user.id) : null;
    // Generate a random user ID for the credential.
    // We can do this because we don't use this user ID to link the
    // credential to the user. Instead, we store actual userID in the
    // Authenticator object and fetch it via it's credential ID.
    const userID = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$utils$2f$web$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["randomString"])(32);
    const relayingParty = provider.getRelayingParty(options, request);
    // Return the registration options.
    return await provider.simpleWebAuthn.generateRegistrationOptions({
        ...provider.registrationOptions,
        userID,
        userName: user.email,
        userDisplayName: user.name ?? undefined,
        rpID: relayingParty.id,
        rpName: relayingParty.name,
        excludeCredentials: authenticators?.map((a)=>({
                id: fromBase64(a.credentialID),
                type: "public-key",
                transports: stringToTransports(a.transports)
            }))
    });
}
function assertInternalOptionsWebAuthn(options) {
    const { provider, adapter } = options;
    // Adapter is required for WebAuthn
    if (!adapter) throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["MissingAdapter"]("An adapter is required for the WebAuthn provider");
    // Provider must be WebAuthn
    if (!provider || provider.type !== "webauthn") {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["InvalidProvider"]("Provider must be WebAuthn");
    }
    // Narrow the options type for typed usage later
    return {
        ...options,
        provider,
        adapter
    };
}
function fromAdapterAuthenticator(authenticator) {
    return {
        ...authenticator,
        credentialDeviceType: authenticator.credentialDeviceType,
        transports: stringToTransports(authenticator.transports),
        credentialID: fromBase64(authenticator.credentialID),
        credentialPublicKey: fromBase64(authenticator.credentialPublicKey)
    };
}
function fromBase64(base64) {
    return new Uint8Array(__TURBOPACK__imported__module__$5b$externals$5d2f$__$5b$external$5d$__$28$node$3a$buffer$2c$__cjs$29$__["Buffer"].from(base64, "base64"));
}
function toBase64(bytes) {
    return __TURBOPACK__imported__module__$5b$externals$5d2f$__$5b$external$5d$__$28$node$3a$buffer$2c$__cjs$29$__["Buffer"].from(bytes).toString("base64");
}
function transportsToString(transports) {
    return transports?.join(",");
}
function stringToTransports(tstring) {
    return tstring ? tstring.split(",") : undefined;
}
}}),
"[project]/node_modules/@auth/core/lib/actions/callback/index.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
// TODO: Make this file smaller
__turbopack_esm__({
    "callback": (()=>callback)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@auth/core/errors.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$actions$2f$callback$2f$handle$2d$login$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@auth/core/lib/actions/callback/handle-login.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$actions$2f$callback$2f$oauth$2f$callback$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@auth/core/lib/actions/callback/oauth/callback.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$actions$2f$callback$2f$oauth$2f$checks$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@auth/core/lib/actions/callback/oauth/checks.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$utils$2f$web$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@auth/core/lib/utils/web.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$utils$2f$webauthn$2d$utils$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@auth/core/lib/utils/webauthn-utils.js [middleware] (ecmascript)");
;
;
;
;
;
;
async function callback(request, options, sessionStore, cookies) {
    if (!options.provider) throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["InvalidProvider"]("Callback route called without provider");
    const { query, body, method, headers } = request;
    const { provider, adapter, url, callbackUrl, pages, jwt, events, callbacks, session: { strategy: sessionStrategy, maxAge: sessionMaxAge }, logger } = options;
    const useJwtSession = sessionStrategy === "jwt";
    try {
        if (provider.type === "oauth" || provider.type === "oidc") {
            // Use body if the response mode is set to form_post. For all other cases, use query
            const params = provider.authorization?.url.searchParams.get("response_mode") === "form_post" ? body : query;
            // If we have a state and we are on a redirect proxy, we try to parse it
            // and see if it contains a valid origin to redirect to. If it does, we
            // redirect the user to that origin with the original state.
            if (options.isOnRedirectProxy && params?.state) {
                // NOTE: We rely on the state being encrypted using a shared secret
                // between the proxy and the original server.
                const parsedState = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$actions$2f$callback$2f$oauth$2f$checks$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["state"].decode(params.state, options);
                const shouldRedirect = parsedState?.origin && new URL(parsedState.origin).origin !== options.url.origin;
                if (shouldRedirect) {
                    const proxyRedirect = `${parsedState.origin}?${new URLSearchParams(params)}`;
                    logger.debug("Proxy redirecting to", proxyRedirect);
                    return {
                        redirect: proxyRedirect,
                        cookies
                    };
                }
            }
            const authorizationResult = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$actions$2f$callback$2f$oauth$2f$callback$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["handleOAuth"])(params, request.cookies, options);
            if (authorizationResult.cookies.length) {
                cookies.push(...authorizationResult.cookies);
            }
            logger.debug("authorization result", authorizationResult);
            const { user: userFromProvider, account, profile: OAuthProfile } = authorizationResult;
            // If we don't have a profile object then either something went wrong
            // or the user cancelled signing in. We don't know which, so we just
            // direct the user to the signin page for now. We could do something
            // else in future.
            // TODO: Handle user cancelling signin
            if (!userFromProvider || !account || !OAuthProfile) {
                return {
                    redirect: `${url}/signin`,
                    cookies
                };
            }
            // Check if user is allowed to sign in
            // Attempt to get Profile from OAuth provider details before invoking
            // signIn callback - but if no user object is returned, that is fine
            // (that just means it's a new user signing in for the first time).
            let userByAccount;
            if (adapter) {
                const { getUserByAccount } = adapter;
                userByAccount = await getUserByAccount({
                    providerAccountId: account.providerAccountId,
                    provider: provider.id
                });
            }
            const redirect = await handleAuthorized({
                user: userByAccount ?? userFromProvider,
                account,
                profile: OAuthProfile
            }, options);
            if (redirect) return {
                redirect,
                cookies
            };
            const { user, session, isNewUser } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$actions$2f$callback$2f$handle$2d$login$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["handleLoginOrRegister"])(sessionStore.value, userFromProvider, account, options);
            if (useJwtSession) {
                const defaultToken = {
                    name: user.name,
                    email: user.email,
                    picture: user.image,
                    sub: user.id?.toString()
                };
                const token = await callbacks.jwt({
                    token: defaultToken,
                    user,
                    account,
                    profile: OAuthProfile,
                    isNewUser,
                    trigger: isNewUser ? "signUp" : "signIn"
                });
                // Clear cookies if token is null
                if (token === null) {
                    cookies.push(...sessionStore.clean());
                } else {
                    const salt = options.cookies.sessionToken.name;
                    // Encode token
                    const newToken = await jwt.encode({
                        ...jwt,
                        token,
                        salt
                    });
                    // Set cookie expiry date
                    const cookieExpires = new Date();
                    cookieExpires.setTime(cookieExpires.getTime() + sessionMaxAge * 1000);
                    const sessionCookies = sessionStore.chunk(newToken, {
                        expires: cookieExpires
                    });
                    cookies.push(...sessionCookies);
                }
            } else {
                // Save Session Token in cookie
                cookies.push({
                    name: options.cookies.sessionToken.name,
                    value: session.sessionToken,
                    options: {
                        ...options.cookies.sessionToken.options,
                        expires: session.expires
                    }
                });
            }
            await events.signIn?.({
                user,
                account,
                profile: OAuthProfile,
                isNewUser
            });
            // Handle first logins on new accounts
            // e.g. option to send users to a new account landing page on initial login
            // Note that the callback URL is preserved, so the journey can still be resumed
            if (isNewUser && pages.newUser) {
                return {
                    redirect: `${pages.newUser}${pages.newUser.includes("?") ? "&" : "?"}${new URLSearchParams({
                        callbackUrl
                    })}`,
                    cookies
                };
            }
            return {
                redirect: callbackUrl,
                cookies
            };
        } else if (provider.type === "email") {
            const paramToken = query?.token;
            const paramIdentifier = query?.email;
            if (!paramToken) {
                const e = new TypeError("Missing token. The sign-in URL was manually opened without token or the link was not sent correctly in the email.", {
                    cause: {
                        hasToken: !!paramToken
                    }
                });
                e.name = "Configuration";
                throw e;
            }
            const secret = provider.secret ?? options.secret;
            // @ts-expect-error -- Verified in `assertConfig`.
            const invite = await adapter.useVerificationToken({
                // @ts-expect-error User-land adapters might decide to omit the identifier during lookup
                identifier: paramIdentifier,
                token: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$utils$2f$web$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["createHash"])(`${paramToken}${secret}`)
            });
            const hasInvite = !!invite;
            const expired = hasInvite && invite.expires.valueOf() < Date.now();
            const invalidInvite = !hasInvite || expired || paramIdentifier && invite.identifier !== paramIdentifier;
            if (invalidInvite) throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["Verification"]({
                hasInvite,
                expired
            });
            const { identifier } = invite;
            const user = await adapter.getUserByEmail(identifier) ?? {
                id: crypto.randomUUID(),
                email: identifier,
                emailVerified: null
            };
            const account = {
                providerAccountId: user.email,
                userId: user.id,
                type: "email",
                provider: provider.id
            };
            const redirect = await handleAuthorized({
                user,
                account
            }, options);
            if (redirect) return {
                redirect,
                cookies
            };
            // Sign user in
            const { user: loggedInUser, session, isNewUser } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$actions$2f$callback$2f$handle$2d$login$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["handleLoginOrRegister"])(sessionStore.value, user, account, options);
            if (useJwtSession) {
                const defaultToken = {
                    name: loggedInUser.name,
                    email: loggedInUser.email,
                    picture: loggedInUser.image,
                    sub: loggedInUser.id?.toString()
                };
                const token = await callbacks.jwt({
                    token: defaultToken,
                    user: loggedInUser,
                    account,
                    isNewUser,
                    trigger: isNewUser ? "signUp" : "signIn"
                });
                // Clear cookies if token is null
                if (token === null) {
                    cookies.push(...sessionStore.clean());
                } else {
                    const salt = options.cookies.sessionToken.name;
                    // Encode token
                    const newToken = await jwt.encode({
                        ...jwt,
                        token,
                        salt
                    });
                    // Set cookie expiry date
                    const cookieExpires = new Date();
                    cookieExpires.setTime(cookieExpires.getTime() + sessionMaxAge * 1000);
                    const sessionCookies = sessionStore.chunk(newToken, {
                        expires: cookieExpires
                    });
                    cookies.push(...sessionCookies);
                }
            } else {
                // Save Session Token in cookie
                cookies.push({
                    name: options.cookies.sessionToken.name,
                    value: session.sessionToken,
                    options: {
                        ...options.cookies.sessionToken.options,
                        expires: session.expires
                    }
                });
            }
            await events.signIn?.({
                user: loggedInUser,
                account,
                isNewUser
            });
            // Handle first logins on new accounts
            // e.g. option to send users to a new account landing page on initial login
            // Note that the callback URL is preserved, so the journey can still be resumed
            if (isNewUser && pages.newUser) {
                return {
                    redirect: `${pages.newUser}${pages.newUser.includes("?") ? "&" : "?"}${new URLSearchParams({
                        callbackUrl
                    })}`,
                    cookies
                };
            }
            // Callback URL is already verified at this point, so safe to use if specified
            return {
                redirect: callbackUrl,
                cookies
            };
        } else if (provider.type === "credentials" && method === "POST") {
            const credentials = body ?? {};
            // TODO: Forward the original request as is, instead of reconstructing it
            Object.entries(query ?? {}).forEach(([k, v])=>url.searchParams.set(k, v));
            const userFromAuthorize = await provider.authorize(credentials, // prettier-ignore
            new Request(url, {
                headers,
                method,
                body: JSON.stringify(body)
            }));
            const user = userFromAuthorize;
            if (!user) throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["CredentialsSignin"]();
            else user.id = user.id?.toString() ?? crypto.randomUUID();
            const account = {
                providerAccountId: user.id,
                type: "credentials",
                provider: provider.id
            };
            const redirect = await handleAuthorized({
                user,
                account,
                credentials
            }, options);
            if (redirect) return {
                redirect,
                cookies
            };
            const defaultToken = {
                name: user.name,
                email: user.email,
                picture: user.image,
                sub: user.id
            };
            const token = await callbacks.jwt({
                token: defaultToken,
                user,
                account,
                isNewUser: false,
                trigger: "signIn"
            });
            // Clear cookies if token is null
            if (token === null) {
                cookies.push(...sessionStore.clean());
            } else {
                const salt = options.cookies.sessionToken.name;
                // Encode token
                const newToken = await jwt.encode({
                    ...jwt,
                    token,
                    salt
                });
                // Set cookie expiry date
                const cookieExpires = new Date();
                cookieExpires.setTime(cookieExpires.getTime() + sessionMaxAge * 1000);
                const sessionCookies = sessionStore.chunk(newToken, {
                    expires: cookieExpires
                });
                cookies.push(...sessionCookies);
            }
            await events.signIn?.({
                user,
                account
            });
            return {
                redirect: callbackUrl,
                cookies
            };
        } else if (provider.type === "webauthn" && method === "POST") {
            // Get callback action from request. It should be either "authenticate" or "register"
            const action = request.body?.action;
            if (typeof action !== "string" || action !== "authenticate" && action !== "register") {
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["AuthError"]("Invalid action parameter");
            }
            // Return an error if the adapter is missing or if the provider
            // is not a webauthn provider.
            const localOptions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$utils$2f$webauthn$2d$utils$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["assertInternalOptionsWebAuthn"])(options);
            // Verify request to get user, account and authenticator
            let user;
            let account;
            let authenticator;
            switch(action){
                case "authenticate":
                    {
                        const verified = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$utils$2f$webauthn$2d$utils$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["verifyAuthenticate"])(localOptions, request, cookies);
                        user = verified.user;
                        account = verified.account;
                        break;
                    }
                case "register":
                    {
                        const verified = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$utils$2f$webauthn$2d$utils$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["verifyRegister"])(options, request, cookies);
                        user = verified.user;
                        account = verified.account;
                        authenticator = verified.authenticator;
                        break;
                    }
            }
            // Check if user is allowed to sign in
            await handleAuthorized({
                user,
                account
            }, options);
            // Sign user in, creating them and their account if needed
            const { user: loggedInUser, isNewUser, session, account: currentAccount } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$actions$2f$callback$2f$handle$2d$login$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["handleLoginOrRegister"])(sessionStore.value, user, account, options);
            if (!currentAccount) {
                // This is mostly for type checking. It should never actually happen.
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["AuthError"]("Error creating or finding account");
            }
            // Create new authenticator if needed
            if (authenticator && loggedInUser.id) {
                await localOptions.adapter.createAuthenticator({
                    ...authenticator,
                    userId: loggedInUser.id
                });
            }
            // Do the session registering dance
            if (useJwtSession) {
                const defaultToken = {
                    name: loggedInUser.name,
                    email: loggedInUser.email,
                    picture: loggedInUser.image,
                    sub: loggedInUser.id?.toString()
                };
                const token = await callbacks.jwt({
                    token: defaultToken,
                    user: loggedInUser,
                    account: currentAccount,
                    isNewUser,
                    trigger: isNewUser ? "signUp" : "signIn"
                });
                // Clear cookies if token is null
                if (token === null) {
                    cookies.push(...sessionStore.clean());
                } else {
                    const salt = options.cookies.sessionToken.name;
                    // Encode token
                    const newToken = await jwt.encode({
                        ...jwt,
                        token,
                        salt
                    });
                    // Set cookie expiry date
                    const cookieExpires = new Date();
                    cookieExpires.setTime(cookieExpires.getTime() + sessionMaxAge * 1000);
                    const sessionCookies = sessionStore.chunk(newToken, {
                        expires: cookieExpires
                    });
                    cookies.push(...sessionCookies);
                }
            } else {
                // Save Session Token in cookie
                cookies.push({
                    name: options.cookies.sessionToken.name,
                    value: session.sessionToken,
                    options: {
                        ...options.cookies.sessionToken.options,
                        expires: session.expires
                    }
                });
            }
            await events.signIn?.({
                user: loggedInUser,
                account: currentAccount,
                isNewUser
            });
            // Handle first logins on new accounts
            // e.g. option to send users to a new account landing page on initial login
            // Note that the callback URL is preserved, so the journey can still be resumed
            if (isNewUser && pages.newUser) {
                return {
                    redirect: `${pages.newUser}${pages.newUser.includes("?") ? "&" : "?"}${new URLSearchParams({
                        callbackUrl
                    })}`,
                    cookies
                };
            }
            // Callback URL is already verified at this point, so safe to use if specified
            return {
                redirect: callbackUrl,
                cookies
            };
        }
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["InvalidProvider"](`Callback for provider type (${provider.type}) is not supported`);
    } catch (e) {
        if (e instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["AuthError"]) throw e;
        const error = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["CallbackRouteError"](e, {
            provider: provider.id
        });
        logger.debug("callback route error details", {
            method,
            query,
            body
        });
        throw error;
    }
}
async function handleAuthorized(params, config) {
    let authorized;
    const { signIn, redirect } = config.callbacks;
    try {
        authorized = await signIn(params);
    } catch (e) {
        if (e instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["AuthError"]) throw e;
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["AccessDenied"](e);
    }
    if (!authorized) throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["AccessDenied"]("AccessDenied");
    if (typeof authorized !== "string") return;
    return await redirect({
        url: authorized,
        baseUrl: config.url.origin
    });
}
}}),
"[project]/node_modules/@auth/core/lib/actions/session.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "session": (()=>session)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@auth/core/errors.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$utils$2f$date$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@auth/core/lib/utils/date.js [middleware] (ecmascript)");
;
;
async function session(options, sessionStore, cookies, isUpdate, newSession) {
    const { adapter, jwt, events, callbacks, logger, session: { strategy: sessionStrategy, maxAge: sessionMaxAge } } = options;
    const response = {
        body: null,
        headers: {
            "Content-Type": "application/json"
        },
        cookies
    };
    const sessionToken = sessionStore.value;
    if (!sessionToken) return response;
    if (sessionStrategy === "jwt") {
        try {
            const salt = options.cookies.sessionToken.name;
            const payload = await jwt.decode({
                ...jwt,
                token: sessionToken,
                salt
            });
            if (!payload) throw new Error("Invalid JWT");
            // @ts-expect-error
            const token = await callbacks.jwt({
                token: payload,
                ...isUpdate && {
                    trigger: "update"
                },
                session: newSession
            });
            const newExpires = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$utils$2f$date$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["fromDate"])(sessionMaxAge);
            if (token !== null) {
                // By default, only exposes a limited subset of information to the client
                // as needed for presentation purposes (e.g. "you are logged in as...").
                const session = {
                    user: {
                        name: token.name,
                        email: token.email,
                        image: token.picture
                    },
                    expires: newExpires.toISOString()
                };
                // @ts-expect-error
                const newSession = await callbacks.session({
                    session,
                    token
                });
                // Return session payload as response
                response.body = newSession;
                // Refresh JWT expiry by re-signing it, with an updated expiry date
                const newToken = await jwt.encode({
                    ...jwt,
                    token,
                    salt
                });
                // Set cookie, to also update expiry date on cookie
                const sessionCookies = sessionStore.chunk(newToken, {
                    expires: newExpires
                });
                response.cookies?.push(...sessionCookies);
                await events.session?.({
                    session: newSession,
                    token
                });
            } else {
                response.cookies?.push(...sessionStore.clean());
            }
        } catch (e) {
            logger.error(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["JWTSessionError"](e));
            // If the JWT is not verifiable remove the broken session cookie(s).
            response.cookies?.push(...sessionStore.clean());
        }
        return response;
    }
    // Retrieve session from database
    try {
        const { getSessionAndUser, deleteSession, updateSession } = adapter;
        let userAndSession = await getSessionAndUser(sessionToken);
        // If session has expired, clean up the database
        if (userAndSession && userAndSession.session.expires.valueOf() < Date.now()) {
            await deleteSession(sessionToken);
            userAndSession = null;
        }
        if (userAndSession) {
            const { user, session } = userAndSession;
            const sessionUpdateAge = options.session.updateAge;
            // Calculate last updated date to throttle write updates to database
            // Formula: ({expiry date} - sessionMaxAge) + sessionUpdateAge
            //     e.g. ({expiry date} - 30 days) + 1 hour
            const sessionIsDueToBeUpdatedDate = session.expires.valueOf() - sessionMaxAge * 1000 + sessionUpdateAge * 1000;
            const newExpires = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$utils$2f$date$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["fromDate"])(sessionMaxAge);
            // Trigger update of session expiry date and write to database, only
            // if the session was last updated more than {sessionUpdateAge} ago
            if (sessionIsDueToBeUpdatedDate <= Date.now()) {
                await updateSession({
                    sessionToken: sessionToken,
                    expires: newExpires
                });
            }
            // Pass Session through to the session callback
            const sessionPayload = await callbacks.session({
                // TODO: user already passed below,
                // remove from session object in https://github.com/nextauthjs/next-auth/pull/9702
                // @ts-expect-error
                session: {
                    ...session,
                    user
                },
                user,
                newSession,
                ...isUpdate ? {
                    trigger: "update"
                } : {}
            });
            // Return session payload as response
            response.body = sessionPayload;
            // Set cookie again to update expiry
            response.cookies?.push({
                name: options.cookies.sessionToken.name,
                value: sessionToken,
                options: {
                    ...options.cookies.sessionToken.options,
                    expires: newExpires
                }
            });
            // @ts-expect-error
            await events.session?.({
                session: sessionPayload
            });
        } else if (sessionToken) {
            // If `sessionToken` was found set but it's not valid for a session then
            // remove the sessionToken cookie from browser.
            response.cookies?.push(...sessionStore.clean());
        }
    } catch (e) {
        logger.error(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["SessionTokenError"](e));
    }
    return response;
}
}}),
"[project]/node_modules/@auth/core/lib/actions/signin/authorization-url.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "getAuthorizationUrl": (()=>getAuthorizationUrl)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$actions$2f$callback$2f$oauth$2f$checks$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@auth/core/lib/actions/callback/oauth/checks.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$symbols$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@auth/core/lib/symbols.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$oauth4webapi$2f$build$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/oauth4webapi/build/index.js [middleware] (ecmascript)");
;
;
;
async function getAuthorizationUrl(query, options) {
    const { logger, provider } = options;
    let url = provider.authorization?.url;
    let as;
    // Falls back to authjs.dev if the user only passed params
    if (!url || url.host === "authjs.dev") {
        // If url is undefined, we assume that issuer is always defined
        // We check this in assert.ts
        const issuer = new URL(provider.issuer);
        const discoveryResponse = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$oauth4webapi$2f$build$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__.discoveryRequest(issuer, {
            [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$oauth4webapi$2f$build$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__.customFetch]: provider[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$symbols$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["customFetch"]],
            // TODO: move away from allowing insecure HTTP requests
            [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$oauth4webapi$2f$build$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__.allowInsecureRequests]: true
        });
        const as = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$oauth4webapi$2f$build$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__.processDiscoveryResponse(issuer, discoveryResponse);
        if (!as.authorization_endpoint) {
            throw new TypeError("Authorization server did not provide an authorization endpoint.");
        }
        url = new URL(as.authorization_endpoint);
    }
    const authParams = url.searchParams;
    let redirect_uri = provider.callbackUrl;
    let data;
    if (!options.isOnRedirectProxy && provider.redirectProxyUrl) {
        redirect_uri = provider.redirectProxyUrl;
        data = provider.callbackUrl;
        logger.debug("using redirect proxy", {
            redirect_uri,
            data
        });
    }
    const params = Object.assign({
        response_type: "code",
        // clientId can technically be undefined, should we check this in assert.ts or rely on the Authorization Server to do it?
        client_id: provider.clientId,
        redirect_uri,
        // @ts-expect-error TODO:
        ...provider.authorization?.params
    }, Object.fromEntries(provider.authorization?.url.searchParams ?? []), query);
    for(const k in params)authParams.set(k, params[k]);
    const cookies = [];
    if (// Otherwise "POST /redirect_uri" wouldn't include the cookies
    provider.authorization?.url.searchParams.get("response_mode") === "form_post") {
        options.cookies.state.options.sameSite = "none";
        options.cookies.state.options.secure = true;
        options.cookies.nonce.options.sameSite = "none";
        options.cookies.nonce.options.secure = true;
    }
    const state = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$actions$2f$callback$2f$oauth$2f$checks$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__.state.create(options, data);
    if (state) {
        authParams.set("state", state.value);
        cookies.push(state.cookie);
    }
    if (provider.checks?.includes("pkce")) {
        if (as && !as.code_challenge_methods_supported?.includes("S256")) {
            // We assume S256 PKCE support, if the server does not advertise that,
            // a random `nonce` must be used for CSRF protection.
            if (provider.type === "oidc") provider.checks = [
                "nonce"
            ];
        } else {
            const { value, cookie } = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$actions$2f$callback$2f$oauth$2f$checks$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__.pkce.create(options);
            authParams.set("code_challenge", value);
            authParams.set("code_challenge_method", "S256");
            cookies.push(cookie);
        }
    }
    const nonce = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$actions$2f$callback$2f$oauth$2f$checks$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__.nonce.create(options);
    if (nonce) {
        authParams.set("nonce", nonce.value);
        cookies.push(nonce.cookie);
    }
    // TODO: This does not work in normalizeOAuth because authorization endpoint can come from discovery
    // Need to make normalizeOAuth async
    if (provider.type === "oidc" && !url.searchParams.has("scope")) {
        url.searchParams.set("scope", "openid profile email");
    }
    logger.debug("authorization url is ready", {
        url,
        cookies,
        provider
    });
    return {
        redirect: url.toString(),
        cookies
    };
}
}}),
"[project]/node_modules/@auth/core/lib/actions/signin/send-token.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "sendToken": (()=>sendToken)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$utils$2f$web$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@auth/core/lib/utils/web.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@auth/core/errors.js [middleware] (ecmascript)");
;
;
async function sendToken(request, options) {
    const { body } = request;
    const { provider, callbacks, adapter } = options;
    const normalizer = provider.normalizeIdentifier ?? defaultNormalizer;
    const email = normalizer(body?.email);
    const defaultUser = {
        id: crypto.randomUUID(),
        email,
        emailVerified: null
    };
    const user = await adapter.getUserByEmail(email) ?? defaultUser;
    const account = {
        providerAccountId: email,
        userId: user.id,
        type: "email",
        provider: provider.id
    };
    let authorized;
    try {
        authorized = await callbacks.signIn({
            user,
            account,
            email: {
                verificationRequest: true
            }
        });
    } catch (e) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["AccessDenied"](e);
    }
    if (!authorized) throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["AccessDenied"]("AccessDenied");
    if (typeof authorized === "string") {
        return {
            redirect: await callbacks.redirect({
                url: authorized,
                baseUrl: options.url.origin
            })
        };
    }
    const { callbackUrl, theme } = options;
    const token = await provider.generateVerificationToken?.() ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$utils$2f$web$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["randomString"])(32);
    const ONE_DAY_IN_SECONDS = 86400;
    const expires = new Date(Date.now() + (provider.maxAge ?? ONE_DAY_IN_SECONDS) * 1000);
    const secret = provider.secret ?? options.secret;
    const baseUrl = new URL(options.basePath, options.url.origin);
    const sendRequest = provider.sendVerificationRequest({
        identifier: email,
        token,
        expires,
        url: `${baseUrl}/callback/${provider.id}?${new URLSearchParams({
            callbackUrl,
            token,
            email
        })}`,
        provider,
        theme,
        request: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$utils$2f$web$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["toRequest"])(request)
    });
    const createToken = adapter.createVerificationToken?.({
        identifier: email,
        token: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$utils$2f$web$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["createHash"])(`${token}${secret}`),
        expires
    });
    await Promise.all([
        sendRequest,
        createToken
    ]);
    return {
        redirect: `${baseUrl}/verify-request?${new URLSearchParams({
            provider: provider.id,
            type: provider.type
        })}`
    };
}
function defaultNormalizer(email) {
    if (!email) throw new Error("Missing email from request body.");
    // Get the first two elements only,
    // separated by `@` from user input.
    let [local, domain] = email.toLowerCase().trim().split("@");
    // The part before "@" can contain a ","
    // but we remove it on the domain part
    domain = domain.split(",")[0];
    return `${local}@${domain}`;
}
}}),
"[project]/node_modules/@auth/core/lib/actions/signin/index.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "signIn": (()=>signIn)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$actions$2f$signin$2f$authorization$2d$url$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@auth/core/lib/actions/signin/authorization-url.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$actions$2f$signin$2f$send$2d$token$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@auth/core/lib/actions/signin/send-token.js [middleware] (ecmascript)");
;
;
async function signIn(request, cookies, options) {
    const signInUrl = `${options.url.origin}${options.basePath}/signin`;
    if (!options.provider) return {
        redirect: signInUrl,
        cookies
    };
    switch(options.provider.type){
        case "oauth":
        case "oidc":
            {
                const { redirect, cookies: authCookies } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$actions$2f$signin$2f$authorization$2d$url$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["getAuthorizationUrl"])(request.query, options);
                if (authCookies) cookies.push(...authCookies);
                return {
                    redirect,
                    cookies
                };
            }
        case "email":
            {
                const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$actions$2f$signin$2f$send$2d$token$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["sendToken"])(request, options);
                return {
                    ...response,
                    cookies
                };
            }
        default:
            return {
                redirect: signInUrl,
                cookies
            };
    }
}
}}),
"[project]/node_modules/@auth/core/lib/actions/signout.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "signOut": (()=>signOut)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@auth/core/errors.js [middleware] (ecmascript)");
;
async function signOut(cookies, sessionStore, options) {
    const { jwt, events, callbackUrl: redirect, logger, session } = options;
    const sessionToken = sessionStore.value;
    if (!sessionToken) return {
        redirect,
        cookies
    };
    try {
        if (session.strategy === "jwt") {
            const salt = options.cookies.sessionToken.name;
            const token = await jwt.decode({
                ...jwt,
                token: sessionToken,
                salt
            });
            await events.signOut?.({
                token
            });
        } else {
            const session = await options.adapter?.deleteSession(sessionToken);
            await events.signOut?.({
                session
            });
        }
    } catch (e) {
        logger.error(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["SignOutError"](e));
    }
    cookies.push(...sessionStore.clean());
    return {
        redirect,
        cookies
    };
}
}}),
"[project]/node_modules/@auth/core/lib/utils/session.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
/**
 * Returns the currently logged in user, if any.
 */ __turbopack_esm__({
    "getLoggedInUser": (()=>getLoggedInUser)
});
async function getLoggedInUser(options, sessionStore) {
    const { adapter, jwt, session: { strategy: sessionStrategy } } = options;
    const sessionToken = sessionStore.value;
    if (!sessionToken) return null;
    // Try to decode JWT
    if (sessionStrategy === "jwt") {
        const salt = options.cookies.sessionToken.name;
        const payload = await jwt.decode({
            ...jwt,
            token: sessionToken,
            salt
        });
        if (payload && payload.sub) {
            return {
                id: payload.sub,
                name: payload.name,
                email: payload.email,
                image: payload.picture
            };
        }
    } else {
        const userAndSession = await adapter?.getSessionAndUser(sessionToken);
        if (userAndSession) {
            return userAndSession.user;
        }
    }
    return null;
}
}}),
"[project]/node_modules/@auth/core/lib/actions/webauthn-options.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "webAuthnOptions": (()=>webAuthnOptions)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$utils$2f$session$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@auth/core/lib/utils/session.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$utils$2f$webauthn$2d$utils$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@auth/core/lib/utils/webauthn-utils.js [middleware] (ecmascript)");
;
;
async function webAuthnOptions(request, options, sessionStore, cookies) {
    // Return an error if the adapter is missing or if the provider
    // is not a webauthn provider.
    const narrowOptions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$utils$2f$webauthn$2d$utils$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["assertInternalOptionsWebAuthn"])(options);
    const { provider } = narrowOptions;
    // Extract the action from the query parameters
    const { action } = request.query ?? {};
    // Action must be either "register", "authenticate", or undefined
    if (action !== "register" && action !== "authenticate" && typeof action !== "undefined") {
        return {
            status: 400,
            body: {
                error: "Invalid action"
            },
            cookies,
            headers: {
                "Content-Type": "application/json"
            }
        };
    }
    // Get the user info from the session
    const sessionUser = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$utils$2f$session$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["getLoggedInUser"])(options, sessionStore);
    // Extract user info from request
    // If session user exists, we don't need to call getUserInfo
    const getUserInfoResponse = sessionUser ? {
        user: sessionUser,
        exists: true
    } : await provider.getUserInfo(options, request);
    const userInfo = getUserInfoResponse?.user;
    // Make a decision on what kind of webauthn options to return
    const decision = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$utils$2f$webauthn$2d$utils$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["inferWebAuthnOptions"])(action, !!sessionUser, getUserInfoResponse);
    switch(decision){
        case "authenticate":
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$utils$2f$webauthn$2d$utils$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["getAuthenticationResponse"])(narrowOptions, request, userInfo, cookies);
        case "register":
            if (typeof userInfo?.email === "string") {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$utils$2f$webauthn$2d$utils$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["getRegistrationResponse"])(narrowOptions, request, userInfo, cookies);
            }
            break;
        default:
            return {
                status: 400,
                body: {
                    error: "Invalid request"
                },
                cookies,
                headers: {
                    "Content-Type": "application/json"
                }
            };
    }
}
}}),
"[project]/node_modules/@auth/core/lib/actions/index.js [middleware] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({});
;
;
;
;
;
}}),
"[project]/node_modules/@auth/core/lib/actions/index.js [middleware] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, t: require } = __turbopack_context__;
{
__turbopack_esm__({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$actions$2f$callback$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@auth/core/lib/actions/callback/index.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$actions$2f$session$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@auth/core/lib/actions/session.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$actions$2f$signin$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@auth/core/lib/actions/signin/index.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$actions$2f$signout$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@auth/core/lib/actions/signout.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$actions$2f$webauthn$2d$options$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@auth/core/lib/actions/webauthn-options.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$actions$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/@auth/core/lib/actions/index.js [middleware] (ecmascript) <locals>");
}}),
"[project]/node_modules/@auth/core/lib/actions/index.js [middleware] (ecmascript) <exports>": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, t: require } = __turbopack_context__;
{
__turbopack_esm__({
    "callback": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$actions$2f$callback$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["callback"]),
    "session": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$actions$2f$session$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["session"]),
    "signIn": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$actions$2f$signin$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["signIn"]),
    "signOut": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$actions$2f$signout$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["signOut"]),
    "webAuthnOptions": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$actions$2f$webauthn$2d$options$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["webAuthnOptions"])
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$actions$2f$callback$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@auth/core/lib/actions/callback/index.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$actions$2f$session$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@auth/core/lib/actions/session.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$actions$2f$signin$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@auth/core/lib/actions/signin/index.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$actions$2f$signout$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@auth/core/lib/actions/signout.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$actions$2f$webauthn$2d$options$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@auth/core/lib/actions/webauthn-options.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$actions$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/@auth/core/lib/actions/index.js [middleware] (ecmascript) <locals>");
}}),
"[project]/node_modules/@auth/core/lib/actions/index.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, t: require } = __turbopack_context__;
{
__turbopack_esm__({
    "callback": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$actions$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$exports$3e$__["callback"]),
    "session": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$actions$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$exports$3e$__["session"]),
    "signIn": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$actions$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$exports$3e$__["signIn"]),
    "signOut": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$actions$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$exports$3e$__["signOut"]),
    "webAuthnOptions": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$actions$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$exports$3e$__["webAuthnOptions"])
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$actions$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/@auth/core/lib/actions/index.js [middleware] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$actions$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$exports$3e$__ = __turbopack_import__("[project]/node_modules/@auth/core/lib/actions/index.js [middleware] (ecmascript) <exports>");
}}),
"[project]/node_modules/@auth/core/lib/index.js [middleware] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "AuthInternal": (()=>AuthInternal)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$symbols$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@auth/core/lib/symbols.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$init$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@auth/core/lib/init.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$utils$2f$cookie$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@auth/core/lib/utils/cookie.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$actions$2f$callback$2f$oauth$2f$csrf$2d$token$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@auth/core/lib/actions/callback/oauth/csrf-token.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$actions$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@auth/core/lib/actions/index.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$pages$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@auth/core/lib/pages/index.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@auth/core/errors.js [middleware] (ecmascript)");
;
;
;
;
;
;
;
;
async function AuthInternal(request, authOptions) {
    const { action, providerId, error, method } = request;
    const csrfDisabled = authOptions.skipCSRFCheck === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$symbols$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["skipCSRFCheck"];
    const { options, cookies } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$init$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["init"])({
        authOptions,
        action,
        providerId,
        url: request.url,
        callbackUrl: request.body?.callbackUrl ?? request.query?.callbackUrl,
        csrfToken: request.body?.csrfToken,
        cookies: request.cookies,
        isPost: method === "POST",
        csrfDisabled
    });
    const sessionStore = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$utils$2f$cookie$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["SessionStore"](options.cookies.sessionToken, request.cookies, options.logger);
    if (method === "GET") {
        const render = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$pages$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"])({
            ...options,
            query: request.query,
            cookies
        });
        switch(action){
            case "callback":
                return await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$actions$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__.callback(request, options, sessionStore, cookies);
            case "csrf":
                return render.csrf(csrfDisabled, options, cookies);
            case "error":
                return render.error(error);
            case "providers":
                return render.providers(options.providers);
            case "session":
                return await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$actions$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__.session(options, sessionStore, cookies);
            case "signin":
                return render.signin(providerId, error);
            case "signout":
                return render.signout();
            case "verify-request":
                return render.verifyRequest();
            case "webauthn-options":
                return await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$actions$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__.webAuthnOptions(request, options, sessionStore, cookies);
            default:
        }
    } else {
        const { csrfTokenVerified } = options;
        switch(action){
            case "callback":
                if (options.provider.type === "credentials") // Verified CSRF Token required for credentials providers only
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$actions$2f$callback$2f$oauth$2f$csrf$2d$token$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["validateCSRF"])(action, csrfTokenVerified);
                return await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$actions$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__.callback(request, options, sessionStore, cookies);
            case "session":
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$actions$2f$callback$2f$oauth$2f$csrf$2d$token$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["validateCSRF"])(action, csrfTokenVerified);
                return await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$actions$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__.session(options, sessionStore, cookies, true, request.body?.data);
            case "signin":
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$actions$2f$callback$2f$oauth$2f$csrf$2d$token$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["validateCSRF"])(action, csrfTokenVerified);
                return await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$actions$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__.signIn(request, cookies, options);
            case "signout":
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$actions$2f$callback$2f$oauth$2f$csrf$2d$token$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["validateCSRF"])(action, csrfTokenVerified);
                return await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$actions$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__.signOut(cookies, sessionStore, options);
            default:
        }
    }
    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["UnknownAction"](`Cannot handle action: ${action}`);
}
}}),
"[project]/node_modules/@auth/core/lib/index.js [middleware] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, t: require } = __turbopack_context__;
{
__turbopack_esm__({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@auth/core/errors.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$utils$2f$cookie$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@auth/core/lib/utils/cookie.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$init$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@auth/core/lib/init.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$pages$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@auth/core/lib/pages/index.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$actions$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/@auth/core/lib/actions/index.js [middleware] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$actions$2f$callback$2f$oauth$2f$csrf$2d$token$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@auth/core/lib/actions/callback/oauth/csrf-token.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$symbols$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@auth/core/lib/symbols.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/@auth/core/lib/index.js [middleware] (ecmascript) <locals>");
}}),
"[project]/node_modules/@auth/core/lib/utils/env.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "createActionURL": (()=>createActionURL),
    "setEnvDefaults": (()=>setEnvDefaults)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$utils$2f$logger$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@auth/core/lib/utils/logger.js [middleware] (ecmascript)");
;
function setEnvDefaults(envObject, config, suppressBasePathWarning = false) {
    try {
        const url = envObject.AUTH_URL;
        if (url) {
            if (config.basePath) {
                if (!suppressBasePathWarning) {
                    const logger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$utils$2f$logger$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["setLogger"])(config);
                    logger.warn("env-url-basepath-redundant");
                }
            } else {
                config.basePath = new URL(url).pathname;
            }
        }
    } catch  {
    // Catching and swallowing potential URL parsing errors, we'll fall
    // back to `/auth` below.
    } finally{
        config.basePath ?? (config.basePath = `/auth`);
    }
    if (!config.secret?.length) {
        config.secret = [];
        const secret = envObject.AUTH_SECRET;
        if (secret) config.secret.push(secret);
        for (const i of [
            1,
            2,
            3
        ]){
            const secret = envObject[`AUTH_SECRET_${i}`];
            if (secret) config.secret.unshift(secret);
        }
    }
    config.redirectProxyUrl ?? (config.redirectProxyUrl = envObject.AUTH_REDIRECT_PROXY_URL);
    config.trustHost ?? (config.trustHost = !!(envObject.AUTH_URL ?? envObject.AUTH_TRUST_HOST ?? envObject.VERCEL ?? envObject.CF_PAGES ?? envObject.NODE_ENV !== "production"));
    config.providers = config.providers.map((provider)=>{
        const { id } = typeof provider === "function" ? provider({}) : provider;
        const ID = id.toUpperCase().replace(/-/g, "_");
        const clientId = envObject[`AUTH_${ID}_ID`];
        const clientSecret = envObject[`AUTH_${ID}_SECRET`];
        const issuer = envObject[`AUTH_${ID}_ISSUER`];
        const apiKey = envObject[`AUTH_${ID}_KEY`];
        const finalProvider = typeof provider === "function" ? provider({
            clientId,
            clientSecret,
            issuer,
            apiKey
        }) : provider;
        if (finalProvider.type === "oauth" || finalProvider.type === "oidc") {
            finalProvider.clientId ?? (finalProvider.clientId = clientId);
            finalProvider.clientSecret ?? (finalProvider.clientSecret = clientSecret);
            finalProvider.issuer ?? (finalProvider.issuer = issuer);
        } else if (finalProvider.type === "email") {
            finalProvider.apiKey ?? (finalProvider.apiKey = apiKey);
        }
        return finalProvider;
    });
}
function createActionURL(action, protocol, headers, envObject, config) {
    const basePath = config?.basePath;
    const envUrl = envObject.AUTH_URL ?? envObject.NEXTAUTH_URL;
    let url;
    if (envUrl) {
        url = new URL(envUrl);
        if (basePath && basePath !== "/" && url.pathname !== "/") {
            if (url.pathname !== basePath) {
                const logger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$utils$2f$logger$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["setLogger"])(config);
                logger.warn("env-url-basepath-mismatch");
            }
            url.pathname = "/";
        }
    } else {
        const detectedHost = headers.get("x-forwarded-host") ?? headers.get("host");
        const detectedProtocol = headers.get("x-forwarded-proto") ?? protocol ?? "https";
        const _protocol = detectedProtocol.endsWith(":") ? detectedProtocol : detectedProtocol + ":";
        url = new URL(`${_protocol}//${detectedHost}`);
    }
    // remove trailing slash
    const sanitizedUrl = url.toString().replace(/\/$/, "");
    if (basePath) {
        // remove leading and trailing slash
        const sanitizedBasePath = basePath?.replace(/(^\/|\/$)/g, "") ?? "";
        return new URL(`${sanitizedUrl}/${sanitizedBasePath}/${action}`);
    }
    return new URL(`${sanitizedUrl}/${action}`);
}
}}),
"[project]/node_modules/@auth/core/index.js [middleware] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
/**
 *
 * :::warning Experimental
 * `@auth/core` is under active development.
 * :::
 *
 * This is the main entry point to the Auth.js library.
 *
 * Based on the {@link https://developer.mozilla.org/en-US/docs/Web/API/Request Request}
 * and {@link https://developer.mozilla.org/en-US/docs/Web/API/Response Response} Web standard APIs.
 * Primarily used to implement [framework](https://authjs.dev/getting-started/integrations)-specific packages,
 * but it can also be used directly.
 *
 * ## Installation
 *
 * ```bash npm2yarn
 * npm install @auth/core
 * ```
 *
 * ## Usage
 *
 * ```ts
 * import { Auth } from "@auth/core"
 *
 * const request = new Request("https://example.com")
 * const response = await Auth(request, {...})
 *
 * console.log(response instanceof Response) // true
 * ```
 *
 * ## Resources
 *
 * - [Getting started](https://authjs.dev/getting-started)
 * - [Guides](https://authjs.dev/guides)
 *
 * @module @auth/core
 */ __turbopack_esm__({
    "Auth": (()=>Auth)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$utils$2f$logger$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@auth/core/lib/utils/logger.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$utils$2f$web$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@auth/core/lib/utils/web.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$utils$2f$assert$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@auth/core/lib/utils/assert.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@auth/core/errors.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$pages$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@auth/core/lib/pages/index.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$symbols$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@auth/core/lib/symbols.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/@auth/core/lib/index.js [middleware] (ecmascript) <locals>");
;
;
;
;
;
;
;
;
;
;
async function Auth(request, config) {
    const logger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$utils$2f$logger$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["setLogger"])(config);
    const internalRequest = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$utils$2f$web$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["toInternalRequest"])(request, config);
    // There was an error parsing the request
    if (!internalRequest) return Response.json(`Bad request.`, {
        status: 400
    });
    const warningsOrError = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$utils$2f$assert$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["assertConfig"])(internalRequest, config);
    if (Array.isArray(warningsOrError)) {
        warningsOrError.forEach(logger.warn);
    } else if (warningsOrError) {
        // If there's an error in the user config, bail out early
        logger.error(warningsOrError);
        const htmlPages = new Set([
            "signin",
            "signout",
            "error",
            "verify-request"
        ]);
        if (!htmlPages.has(internalRequest.action) || internalRequest.method !== "GET") {
            const message = "There was a problem with the server configuration. Check the server logs for more information.";
            return Response.json({
                message
            }, {
                status: 500
            });
        }
        const { pages, theme } = config;
        // If this is true, the config required auth on the error page
        // which could cause a redirect loop
        const authOnErrorPage = pages?.error && internalRequest.url.searchParams.get("callbackUrl")?.startsWith(pages.error);
        // Either there was no error page configured or the configured one contains infinite redirects
        if (!pages?.error || authOnErrorPage) {
            if (authOnErrorPage) {
                logger.error(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["ErrorPageLoop"](`The error page ${pages?.error} should not require authentication`));
            }
            const page = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$pages$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"])({
                theme
            }).error("Configuration");
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$utils$2f$web$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["toResponse"])(page);
        }
        const url = `${internalRequest.url.origin}${pages.error}?error=Configuration`;
        return Response.redirect(url);
    }
    const isRedirect = request.headers?.has("X-Auth-Return-Redirect");
    const isRaw = config.raw === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$symbols$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["raw"];
    try {
        const internalResponse = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__["AuthInternal"])(internalRequest, config);
        if (isRaw) return internalResponse;
        const response = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$utils$2f$web$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["toResponse"])(internalResponse);
        const url = response.headers.get("Location");
        if (!isRedirect || !url) return response;
        return Response.json({
            url
        }, {
            headers: response.headers
        });
    } catch (e) {
        const error = e;
        logger.error(error);
        const isAuthError = error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["AuthError"];
        if (isAuthError && isRaw && !isRedirect) throw error;
        // If the CSRF check failed for POST/session, return a 400 status code.
        // We should not redirect to a page as this is an API route
        if (request.method === "POST" && internalRequest.action === "session") return Response.json(null, {
            status: 400
        });
        const isClientSafeErrorType = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["isClientError"])(error);
        const type = isClientSafeErrorType ? error.type : "Configuration";
        const params = new URLSearchParams({
            error: type
        });
        if (error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["CredentialsSignin"]) params.set("code", error.code);
        const pageKind = isAuthError && error.kind || "error";
        const pagePath = config.pages?.[pageKind] ?? `${config.basePath}/${pageKind.toLowerCase()}`;
        const url = `${internalRequest.url.origin}${pagePath}?${params}`;
        if (isRedirect) return Response.json({
            url
        });
        return Response.redirect(url);
    }
}
}}),
"[project]/node_modules/@auth/core/index.js [middleware] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, t: require } = __turbopack_context__;
{
__turbopack_esm__({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$utils$2f$assert$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@auth/core/lib/utils/assert.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@auth/core/errors.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/@auth/core/lib/index.js [middleware] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$utils$2f$env$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@auth/core/lib/utils/env.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$pages$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@auth/core/lib/pages/index.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$utils$2f$logger$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@auth/core/lib/utils/logger.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$utils$2f$web$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@auth/core/lib/utils/web.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$utils$2f$actions$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@auth/core/lib/utils/actions.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$symbols$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@auth/core/lib/symbols.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/@auth/core/index.js [middleware] (ecmascript) <locals>");
}}),
"[project]/node_modules/next/dist/esm/api/server.js [middleware] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({});
;
 //# sourceMappingURL=server.js.map
}}),
"[project]/node_modules/next/dist/esm/api/server.js [middleware] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, t: require } = __turbopack_context__;
{
__turbopack_esm__({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/next/dist/esm/server/web/exports/index.js [middleware] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/next/dist/esm/api/server.js [middleware] (ecmascript) <locals>");
}}),
"[project]/node_modules/next/dist/esm/api/server.js [middleware] (ecmascript) <exports>": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, t: require } = __turbopack_context__;
{
__turbopack_esm__({
    "ImageResponse": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["ImageResponse"]),
    "NextRequest": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextRequest"]),
    "NextResponse": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"]),
    "URLPattern": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["URLPattern"]),
    "connection": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["connection"]),
    "unstable_after": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["unstable_after"]),
    "userAgent": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["userAgent"]),
    "userAgentFromString": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["userAgentFromString"])
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/esm/server/web/exports/index.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/next/dist/esm/api/server.js [middleware] (ecmascript) <locals>");
}}),
"[project]/node_modules/next-auth/lib/env.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
// @ts-expect-error Next.js does not yet correctly use the `package.json#exports` field
__turbopack_esm__({
    "reqWithEnvURL": (()=>reqWithEnvURL),
    "setEnvDefaults": (()=>setEnvDefaults)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/next/dist/esm/api/server.js [middleware] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/@auth/core/index.js [middleware] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$request$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/esm/server/web/spec-extension/request.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$utils$2f$env$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@auth/core/lib/utils/env.js [middleware] (ecmascript)");
;
;
function reqWithEnvURL(req) {
    const url = process.env.AUTH_URL ?? process.env.NEXTAUTH_URL;
    if (!url) return req;
    const { origin: envOrigin } = new URL(url);
    const { href, origin } = req.nextUrl;
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$request$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextRequest"](href.replace(origin, envOrigin), req);
}
function setEnvDefaults(config) {
    try {
        config.secret ?? (config.secret = process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET);
        const url = process.env.AUTH_URL ?? process.env.NEXTAUTH_URL;
        if (!url) return;
        const { pathname } = new URL(url);
        if (pathname === "/") return;
        config.basePath || (config.basePath = pathname);
    } catch  {
    // Catching and swallowing potential URL parsing errors, we'll fall
    // back to `/api/auth` below.
    } finally{
        config.basePath || (config.basePath = "/api/auth");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$utils$2f$env$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["setEnvDefaults"])(process.env, config, true);
    }
}
}}),
"[project]/node_modules/next/dist/esm/client/components/static-generation-bailout.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "StaticGenBailoutError": (()=>StaticGenBailoutError),
    "isStaticGenBailoutError": (()=>isStaticGenBailoutError)
});
const NEXT_STATIC_GEN_BAILOUT = 'NEXT_STATIC_GEN_BAILOUT';
class StaticGenBailoutError extends Error {
    constructor(...args){
        super(...args);
        this.code = NEXT_STATIC_GEN_BAILOUT;
    }
}
function isStaticGenBailoutError(error) {
    if (typeof error !== 'object' || error === null || !('code' in error)) {
        return false;
    }
    return error.code === NEXT_STATIC_GEN_BAILOUT;
} //# sourceMappingURL=static-generation-bailout.js.map
}}),
"[project]/node_modules/next/dist/esm/lib/scheduler.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
/**
 * Schedules a function to be called on the next tick after the other promises
 * have been resolved.
 *
 * @param cb the function to schedule
 */ __turbopack_esm__({
    "atLeastOneTask": (()=>atLeastOneTask),
    "scheduleImmediate": (()=>scheduleImmediate),
    "scheduleOnNextTick": (()=>scheduleOnNextTick),
    "waitAtLeastOneReactRenderTask": (()=>waitAtLeastOneReactRenderTask)
});
const scheduleOnNextTick = (cb)=>{
    // We use Promise.resolve().then() here so that the operation is scheduled at
    // the end of the promise job queue, we then add it to the next process tick
    // to ensure it's evaluated afterwards.
    //
    // This was inspired by the implementation of the DataLoader interface: https://github.com/graphql/dataloader/blob/d336bd15282664e0be4b4a657cb796f09bafbc6b/src/index.js#L213-L255
    //
    Promise.resolve().then(()=>{
        if ("TURBOPACK compile-time truthy", 1) {
            setTimeout(cb, 0);
        } else {
            "TURBOPACK unreachable";
        }
    });
};
const scheduleImmediate = (cb)=>{
    if ("TURBOPACK compile-time truthy", 1) {
        setTimeout(cb, 0);
    } else {
        "TURBOPACK unreachable";
    }
};
function atLeastOneTask() {
    return new Promise((resolve)=>scheduleImmediate(resolve));
}
function waitAtLeastOneReactRenderTask() {
    if ("TURBOPACK compile-time truthy", 1) {
        return new Promise((r)=>setTimeout(r, 0));
    } else {
        "TURBOPACK unreachable";
    }
} //# sourceMappingURL=scheduler.js.map
}}),
"[project]/node_modules/next/dist/esm/server/request/cookies.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "cookies": (()=>cookies)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$request$2d$cookies$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/esm/server/web/spec-extension/adapters/request-cookies.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$cookies$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/next/dist/esm/server/web/spec-extension/cookies.js [middleware] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2e$external$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/next/dist/esm/server/app-render/work-async-storage.external.js [middleware] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2e$external$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/next/dist/esm/server/app-render/work-unit-async-storage.external.js [middleware] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$dynamic$2d$rendering$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/esm/server/app-render/dynamic-rendering.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$static$2d$generation$2d$bailout$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/esm/client/components/static-generation-bailout.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$dynamic$2d$rendering$2d$utils$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/esm/server/dynamic-rendering-utils.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$create$2d$deduped$2d$by$2d$callsite$2d$server$2d$error$2d$logger$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/esm/server/create-deduped-by-callsite-server-error-logger.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$scheduler$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/esm/lib/scheduler.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/esm/server/app-render/work-async-storage-instance.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/esm/server/app-render/work-unit-async-storage-instance.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2e$external$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/next/dist/esm/server/app-render/work-unit-async-storage.external.js [middleware] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f40$edge$2d$runtime$2f$cookies$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/@edge-runtime/cookies/index.js [middleware] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
function cookies() {
    const callingExpression = 'cookies';
    const workStore = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["workAsyncStorage"].getStore();
    const workUnitStore = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["workUnitAsyncStorage"].getStore();
    if (workStore) {
        if (workStore.forceStatic) {
            // When using forceStatic we override all other logic and always just return an empty
            // cookies object without tracking
            const underlyingCookies = createEmptyCookies();
            return makeUntrackedExoticCookies(underlyingCookies);
        }
        if (workUnitStore) {
            if (workUnitStore.type === 'cache') {
                throw new Error(`Route ${workStore.route} used "cookies" inside "use cache". Accessing Dynamic data sources inside a cache scope is not supported. If you need this data inside a cached function use "cookies" outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`);
            } else if (workUnitStore.type === 'unstable-cache') {
                throw new Error(`Route ${workStore.route} used "cookies" inside a function cached with "unstable_cache(...)". Accessing Dynamic data sources inside a cache scope is not supported. If you need this data inside a cached function use "cookies" outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/app/api-reference/functions/unstable_cache`);
            } else if (workUnitStore.phase === 'after') {
                throw new Error(`Route ${workStore.route} used "cookies" inside "unstable_after(...)". This is not supported. If you need this data inside an "unstable_after" callback, use "cookies" outside of the callback. See more info here: https://nextjs.org/docs/canary/app/api-reference/functions/unstable_after`);
            }
        }
        if (workStore.dynamicShouldError) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$static$2d$generation$2d$bailout$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["StaticGenBailoutError"](`Route ${workStore.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`cookies\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`);
        }
        if (workUnitStore) {
            if (workUnitStore.type === 'prerender') {
                // dynamicIO Prerender
                // We don't track dynamic access here because access will be tracked when you access
                // one of the properties of the cookies object.
                return makeDynamicallyTrackedExoticCookies(workStore.route, workUnitStore);
            } else if (workUnitStore.type === 'prerender-ppr') {
                // PPR Prerender (no dynamicIO)
                // We are prerendering with PPR. We need track dynamic access here eagerly
                // to keep continuity with how cookies has worked in PPR without dynamicIO.
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$dynamic$2d$rendering$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["postponeWithTracking"])(workStore.route, callingExpression, workUnitStore.dynamicTracking);
            } else if (workUnitStore.type === 'prerender-legacy') {
                // Legacy Prerender
                // We track dynamic access here so we don't need to wrap the cookies in
                // individual property access tracking.
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$dynamic$2d$rendering$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["throwToInterruptStaticGeneration"])(callingExpression, workStore, workUnitStore);
            }
        }
        // We fall through to the dynamic context below but we still track dynamic access
        // because in dev we can still error for things like using cookies inside a cache context
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$dynamic$2d$rendering$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["trackDynamicDataInDynamicRender"])(workStore, workUnitStore);
    }
    // cookies is being called in a dynamic context
    const requestStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2e$external$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getExpectedRequestStore"])(callingExpression);
    let underlyingCookies;
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$request$2d$cookies$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["areCookiesMutableInCurrentPhase"])(requestStore)) {
        // We can't conditionally return different types here based on the context.
        // To avoid confusion, we always return the readonly type here.
        underlyingCookies = requestStore.userspaceMutableCookies;
    } else {
        underlyingCookies = requestStore.cookies;
    }
    if (("TURBOPACK compile-time value", "development") === 'development' && !(workStore == null ? void 0 : workStore.isPrefetchRequest)) {
        return makeUntrackedExoticCookiesWithDevWarnings(underlyingCookies, workStore == null ? void 0 : workStore.route);
    } else {
        return makeUntrackedExoticCookies(underlyingCookies);
    }
}
function createEmptyCookies() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$request$2d$cookies$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["RequestCookiesAdapter"].seal(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f40$edge$2d$runtime$2f$cookies$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["RequestCookies"](new Headers({})));
}
const CachedCookies = new WeakMap();
function makeDynamicallyTrackedExoticCookies(route, prerenderStore) {
    const cachedPromise = CachedCookies.get(prerenderStore);
    if (cachedPromise) {
        return cachedPromise;
    }
    const promise = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$dynamic$2d$rendering$2d$utils$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["makeHangingPromise"])(prerenderStore.renderSignal, '`cookies()`');
    CachedCookies.set(prerenderStore, promise);
    Object.defineProperties(promise, {
        [Symbol.iterator]: {
            value: function() {
                const expression = '`cookies()[Symbol.iterator]()`';
                const error = createCookiesAccessError(route, expression);
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$dynamic$2d$rendering$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["abortAndThrowOnSynchronousRequestDataAccess"])(route, expression, error, prerenderStore);
            }
        },
        size: {
            get () {
                const expression = '`cookies().size`';
                const error = createCookiesAccessError(route, expression);
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$dynamic$2d$rendering$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["abortAndThrowOnSynchronousRequestDataAccess"])(route, expression, error, prerenderStore);
            }
        },
        get: {
            value: function get() {
                let expression;
                if (arguments.length === 0) {
                    expression = '`cookies().get()`';
                } else {
                    expression = `\`cookies().get(${describeNameArg(arguments[0])})\``;
                }
                const error = createCookiesAccessError(route, expression);
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$dynamic$2d$rendering$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["abortAndThrowOnSynchronousRequestDataAccess"])(route, expression, error, prerenderStore);
            }
        },
        getAll: {
            value: function getAll() {
                let expression;
                if (arguments.length === 0) {
                    expression = '`cookies().getAll()`';
                } else {
                    expression = `\`cookies().getAll(${describeNameArg(arguments[0])})\``;
                }
                const error = createCookiesAccessError(route, expression);
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$dynamic$2d$rendering$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["abortAndThrowOnSynchronousRequestDataAccess"])(route, expression, error, prerenderStore);
            }
        },
        has: {
            value: function has() {
                let expression;
                if (arguments.length === 0) {
                    expression = '`cookies().has()`';
                } else {
                    expression = `\`cookies().has(${describeNameArg(arguments[0])})\``;
                }
                const error = createCookiesAccessError(route, expression);
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$dynamic$2d$rendering$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["abortAndThrowOnSynchronousRequestDataAccess"])(route, expression, error, prerenderStore);
            }
        },
        set: {
            value: function set() {
                let expression;
                if (arguments.length === 0) {
                    expression = '`cookies().set()`';
                } else {
                    const arg = arguments[0];
                    if (arg) {
                        expression = `\`cookies().set(${describeNameArg(arg)}, ...)\``;
                    } else {
                        expression = '`cookies().set(...)`';
                    }
                }
                const error = createCookiesAccessError(route, expression);
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$dynamic$2d$rendering$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["abortAndThrowOnSynchronousRequestDataAccess"])(route, expression, error, prerenderStore);
            }
        },
        delete: {
            value: function() {
                let expression;
                if (arguments.length === 0) {
                    expression = '`cookies().delete()`';
                } else if (arguments.length === 1) {
                    expression = `\`cookies().delete(${describeNameArg(arguments[0])})\``;
                } else {
                    expression = `\`cookies().delete(${describeNameArg(arguments[0])}, ...)\``;
                }
                const error = createCookiesAccessError(route, expression);
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$dynamic$2d$rendering$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["abortAndThrowOnSynchronousRequestDataAccess"])(route, expression, error, prerenderStore);
            }
        },
        clear: {
            value: function clear() {
                const expression = '`cookies().clear()`';
                const error = createCookiesAccessError(route, expression);
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$dynamic$2d$rendering$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["abortAndThrowOnSynchronousRequestDataAccess"])(route, expression, error, prerenderStore);
            }
        },
        toString: {
            value: function toString() {
                const expression = '`cookies().toString()`';
                const error = createCookiesAccessError(route, expression);
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$dynamic$2d$rendering$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["abortAndThrowOnSynchronousRequestDataAccess"])(route, expression, error, prerenderStore);
            }
        }
    });
    return promise;
}
function makeUntrackedExoticCookies(underlyingCookies) {
    const cachedCookies = CachedCookies.get(underlyingCookies);
    if (cachedCookies) {
        return cachedCookies;
    }
    const promise = Promise.resolve(underlyingCookies);
    CachedCookies.set(underlyingCookies, promise);
    Object.defineProperties(promise, {
        [Symbol.iterator]: {
            value: underlyingCookies[Symbol.iterator] ? underlyingCookies[Symbol.iterator].bind(underlyingCookies) : // but that's already a hard thing to debug so we may as well implement it consistently. The biggest problem with
            // implementing this in this way is the underlying cookie type is a ResponseCookie and not a RequestCookie and so it
            // has extra properties not available on RequestCookie instances.
            polyfilledResponseCookiesIterator.bind(underlyingCookies)
        },
        size: {
            get () {
                return underlyingCookies.size;
            }
        },
        get: {
            value: underlyingCookies.get.bind(underlyingCookies)
        },
        getAll: {
            value: underlyingCookies.getAll.bind(underlyingCookies)
        },
        has: {
            value: underlyingCookies.has.bind(underlyingCookies)
        },
        set: {
            value: underlyingCookies.set.bind(underlyingCookies)
        },
        delete: {
            value: underlyingCookies.delete.bind(underlyingCookies)
        },
        clear: {
            value: typeof underlyingCookies.clear === 'function' ? underlyingCookies.clear.bind(underlyingCookies) : // but that's already a hard thing to debug so we may as well implement it consistently. The biggest problem with
            // implementing this in this way is the underlying cookie type is a ResponseCookie and not a RequestCookie and so it
            // has extra properties not available on RequestCookie instances.
            polyfilledResponseCookiesClear.bind(underlyingCookies, promise)
        },
        toString: {
            value: underlyingCookies.toString.bind(underlyingCookies)
        }
    });
    return promise;
}
function makeUntrackedExoticCookiesWithDevWarnings(underlyingCookies, route) {
    const cachedCookies = CachedCookies.get(underlyingCookies);
    if (cachedCookies) {
        return cachedCookies;
    }
    const promise = new Promise((resolve)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$scheduler$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["scheduleImmediate"])(()=>resolve(underlyingCookies)));
    CachedCookies.set(underlyingCookies, promise);
    Object.defineProperties(promise, {
        [Symbol.iterator]: {
            value: function() {
                const expression = '`...cookies()` or similar iteration';
                syncIODev(route, expression);
                return underlyingCookies[Symbol.iterator] ? underlyingCookies[Symbol.iterator].apply(underlyingCookies, arguments) : // but that's already a hard thing to debug so we may as well implement it consistently. The biggest problem with
                // implementing this in this way is the underlying cookie type is a ResponseCookie and not a RequestCookie and so it
                // has extra properties not available on RequestCookie instances.
                polyfilledResponseCookiesIterator.call(underlyingCookies);
            },
            writable: false
        },
        size: {
            get () {
                const expression = '`cookies().size`';
                syncIODev(route, expression);
                return underlyingCookies.size;
            }
        },
        get: {
            value: function get() {
                let expression;
                if (arguments.length === 0) {
                    expression = '`cookies().get()`';
                } else {
                    expression = `\`cookies().get(${describeNameArg(arguments[0])})\``;
                }
                syncIODev(route, expression);
                return underlyingCookies.get.apply(underlyingCookies, arguments);
            },
            writable: false
        },
        getAll: {
            value: function getAll() {
                let expression;
                if (arguments.length === 0) {
                    expression = '`cookies().getAll()`';
                } else {
                    expression = `\`cookies().getAll(${describeNameArg(arguments[0])})\``;
                }
                syncIODev(route, expression);
                return underlyingCookies.getAll.apply(underlyingCookies, arguments);
            },
            writable: false
        },
        has: {
            value: function get() {
                let expression;
                if (arguments.length === 0) {
                    expression = '`cookies().has()`';
                } else {
                    expression = `\`cookies().has(${describeNameArg(arguments[0])})\``;
                }
                syncIODev(route, expression);
                return underlyingCookies.has.apply(underlyingCookies, arguments);
            },
            writable: false
        },
        set: {
            value: function set() {
                let expression;
                if (arguments.length === 0) {
                    expression = '`cookies().set()`';
                } else {
                    const arg = arguments[0];
                    if (arg) {
                        expression = `\`cookies().set(${describeNameArg(arg)}, ...)\``;
                    } else {
                        expression = '`cookies().set(...)`';
                    }
                }
                syncIODev(route, expression);
                return underlyingCookies.set.apply(underlyingCookies, arguments);
            },
            writable: false
        },
        delete: {
            value: function() {
                let expression;
                if (arguments.length === 0) {
                    expression = '`cookies().delete()`';
                } else if (arguments.length === 1) {
                    expression = `\`cookies().delete(${describeNameArg(arguments[0])})\``;
                } else {
                    expression = `\`cookies().delete(${describeNameArg(arguments[0])}, ...)\``;
                }
                syncIODev(route, expression);
                return underlyingCookies.delete.apply(underlyingCookies, arguments);
            },
            writable: false
        },
        clear: {
            value: function clear() {
                const expression = '`cookies().clear()`';
                syncIODev(route, expression);
                // @ts-ignore clear is defined in RequestCookies implementation but not in the type
                return typeof underlyingCookies.clear === 'function' ? underlyingCookies.clear.apply(underlyingCookies, arguments) : // but that's already a hard thing to debug so we may as well implement it consistently. The biggest problem with
                // implementing this in this way is the underlying cookie type is a ResponseCookie and not a RequestCookie and so it
                // has extra properties not available on RequestCookie instances.
                polyfilledResponseCookiesClear.call(underlyingCookies, promise);
            },
            writable: false
        },
        toString: {
            value: function toString() {
                const expression = '`cookies().toString()` or implicit casting';
                syncIODev(route, expression);
                return underlyingCookies.toString.apply(underlyingCookies, arguments);
            },
            writable: false
        }
    });
    return promise;
}
function describeNameArg(arg) {
    return typeof arg === 'object' && arg !== null && typeof arg.name === 'string' ? `'${arg.name}'` : typeof arg === 'string' ? `'${arg}'` : '...';
}
function syncIODev(route, expression) {
    const workUnitStore = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["workUnitAsyncStorage"].getStore();
    if (workUnitStore && workUnitStore.type === 'request' && workUnitStore.prerenderPhase === true) {
        // When we're rendering dynamically in dev we need to advance out of the
        // Prerender environment when we read Request data synchronously
        const requestStore = workUnitStore;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$dynamic$2d$rendering$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["trackSynchronousRequestDataAccessInDev"])(requestStore);
    }
    // In all cases we warn normally
    warnForSyncAccess(route, expression);
}
const noop = ()=>{};
const warnForSyncAccess = ("TURBOPACK compile-time falsy", 0) ? ("TURBOPACK unreachable", undefined) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$create$2d$deduped$2d$by$2d$callsite$2d$server$2d$error$2d$logger$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["createDedupedByCallsiteServerErrorLoggerDev"])(createCookiesAccessError);
function createCookiesAccessError(route, expression) {
    const prefix = route ? `Route "${route}" ` : 'This route ';
    return new Error(`${prefix}used ${expression}. ` + `\`cookies()\` should be awaited before using its value. ` + `Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`);
}
function polyfilledResponseCookiesIterator() {
    return this.getAll().map((c)=>[
            c.name,
            c
        ]).values();
}
function polyfilledResponseCookiesClear(returnable) {
    for (const cookie of this.getAll()){
        this.delete(cookie.name);
    }
    return returnable;
} //# sourceMappingURL=cookies.js.map
}}),
"[project]/node_modules/next/dist/esm/server/request/headers.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "headers": (()=>headers)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$headers$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/esm/server/web/spec-extension/adapters/headers.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2e$external$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/next/dist/esm/server/app-render/work-async-storage.external.js [middleware] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2e$external$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/next/dist/esm/server/app-render/work-unit-async-storage.external.js [middleware] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$dynamic$2d$rendering$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/esm/server/app-render/dynamic-rendering.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$static$2d$generation$2d$bailout$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/esm/client/components/static-generation-bailout.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$dynamic$2d$rendering$2d$utils$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/esm/server/dynamic-rendering-utils.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$create$2d$deduped$2d$by$2d$callsite$2d$server$2d$error$2d$logger$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/esm/server/create-deduped-by-callsite-server-error-logger.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$scheduler$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/esm/lib/scheduler.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/esm/server/app-render/work-async-storage-instance.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/esm/server/app-render/work-unit-async-storage-instance.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2e$external$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/next/dist/esm/server/app-render/work-unit-async-storage.external.js [middleware] (ecmascript) <locals>");
;
;
;
;
;
;
;
;
;
function headers() {
    const workStore = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["workAsyncStorage"].getStore();
    const workUnitStore = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["workUnitAsyncStorage"].getStore();
    if (workStore) {
        if (workStore.forceStatic) {
            // When using forceStatic we override all other logic and always just return an empty
            // headers object without tracking
            const underlyingHeaders = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$headers$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["HeadersAdapter"].seal(new Headers({}));
            return makeUntrackedExoticHeaders(underlyingHeaders);
        }
        if (workUnitStore) {
            if (workUnitStore.type === 'cache') {
                throw new Error(`Route ${workStore.route} used "headers" inside "use cache". Accessing Dynamic data sources inside a cache scope is not supported. If you need this data inside a cached function use "headers" outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`);
            } else if (workUnitStore.type === 'unstable-cache') {
                throw new Error(`Route ${workStore.route} used "headers" inside a function cached with "unstable_cache(...)". Accessing Dynamic data sources inside a cache scope is not supported. If you need this data inside a cached function use "headers" outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/app/api-reference/functions/unstable_cache`);
            } else if (workUnitStore.phase === 'after') {
                throw new Error(`Route ${workStore.route} used "headers" inside "unstable_after(...)". This is not supported. If you need this data inside an "unstable_after" callback, use "headers" outside of the callback. See more info here: https://nextjs.org/docs/canary/app/api-reference/functions/unstable_after`);
            }
        }
        if (workStore.dynamicShouldError) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$static$2d$generation$2d$bailout$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["StaticGenBailoutError"](`Route ${workStore.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`headers\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`);
        }
        if (workUnitStore) {
            if (workUnitStore.type === 'prerender') {
                // dynamicIO Prerender
                // We don't track dynamic access here because access will be tracked when you access
                // one of the properties of the headers object.
                return makeDynamicallyTrackedExoticHeaders(workStore.route, workUnitStore);
            } else if (workUnitStore.type === 'prerender-ppr') {
                // PPR Prerender (no dynamicIO)
                // We are prerendering with PPR. We need track dynamic access here eagerly
                // to keep continuity with how headers has worked in PPR without dynamicIO.
                // TODO consider switching the semantic to throw on property access instead
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$dynamic$2d$rendering$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["postponeWithTracking"])(workStore.route, 'headers', workUnitStore.dynamicTracking);
            } else if (workUnitStore.type === 'prerender-legacy') {
                // Legacy Prerender
                // We are in a legacy static generation mode while prerendering
                // We track dynamic access here so we don't need to wrap the headers in
                // individual property access tracking.
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$dynamic$2d$rendering$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["throwToInterruptStaticGeneration"])('headers', workStore, workUnitStore);
            }
        }
        // We fall through to the dynamic context below but we still track dynamic access
        // because in dev we can still error for things like using headers inside a cache context
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$dynamic$2d$rendering$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["trackDynamicDataInDynamicRender"])(workStore, workUnitStore);
    }
    const requestStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2e$external$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getExpectedRequestStore"])('headers');
    if (("TURBOPACK compile-time value", "development") === 'development' && !(workStore == null ? void 0 : workStore.isPrefetchRequest)) {
        return makeUntrackedExoticHeadersWithDevWarnings(requestStore.headers, workStore == null ? void 0 : workStore.route);
    } else {
        return makeUntrackedExoticHeaders(requestStore.headers);
    }
}
const CachedHeaders = new WeakMap();
function makeDynamicallyTrackedExoticHeaders(route, prerenderStore) {
    const cachedHeaders = CachedHeaders.get(prerenderStore);
    if (cachedHeaders) {
        return cachedHeaders;
    }
    const promise = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$dynamic$2d$rendering$2d$utils$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["makeHangingPromise"])(prerenderStore.renderSignal, '`headers()`');
    CachedHeaders.set(prerenderStore, promise);
    Object.defineProperties(promise, {
        append: {
            value: function append() {
                const expression = `\`headers().append(${describeNameArg(arguments[0])}, ...)\``;
                const error = createHeadersAccessError(route, expression);
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$dynamic$2d$rendering$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["abortAndThrowOnSynchronousRequestDataAccess"])(route, expression, error, prerenderStore);
            }
        },
        delete: {
            value: function _delete() {
                const expression = `\`headers().delete(${describeNameArg(arguments[0])})\``;
                const error = createHeadersAccessError(route, expression);
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$dynamic$2d$rendering$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["abortAndThrowOnSynchronousRequestDataAccess"])(route, expression, error, prerenderStore);
            }
        },
        get: {
            value: function get() {
                const expression = `\`headers().get(${describeNameArg(arguments[0])})\``;
                const error = createHeadersAccessError(route, expression);
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$dynamic$2d$rendering$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["abortAndThrowOnSynchronousRequestDataAccess"])(route, expression, error, prerenderStore);
            }
        },
        has: {
            value: function has() {
                const expression = `\`headers().has(${describeNameArg(arguments[0])})\``;
                const error = createHeadersAccessError(route, expression);
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$dynamic$2d$rendering$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["abortAndThrowOnSynchronousRequestDataAccess"])(route, expression, error, prerenderStore);
            }
        },
        set: {
            value: function set() {
                const expression = `\`headers().set(${describeNameArg(arguments[0])}, ...)\``;
                const error = createHeadersAccessError(route, expression);
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$dynamic$2d$rendering$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["abortAndThrowOnSynchronousRequestDataAccess"])(route, expression, error, prerenderStore);
            }
        },
        getSetCookie: {
            value: function getSetCookie() {
                const expression = '`headers().getSetCookie()`';
                const error = createHeadersAccessError(route, expression);
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$dynamic$2d$rendering$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["abortAndThrowOnSynchronousRequestDataAccess"])(route, expression, error, prerenderStore);
            }
        },
        forEach: {
            value: function forEach() {
                const expression = '`headers().forEach(...)`';
                const error = createHeadersAccessError(route, expression);
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$dynamic$2d$rendering$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["abortAndThrowOnSynchronousRequestDataAccess"])(route, expression, error, prerenderStore);
            }
        },
        keys: {
            value: function keys() {
                const expression = '`headers().keys()`';
                const error = createHeadersAccessError(route, expression);
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$dynamic$2d$rendering$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["abortAndThrowOnSynchronousRequestDataAccess"])(route, expression, error, prerenderStore);
            }
        },
        values: {
            value: function values() {
                const expression = '`headers().values()`';
                const error = createHeadersAccessError(route, expression);
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$dynamic$2d$rendering$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["abortAndThrowOnSynchronousRequestDataAccess"])(route, expression, error, prerenderStore);
            }
        },
        entries: {
            value: function entries() {
                const expression = '`headers().entries()`';
                const error = createHeadersAccessError(route, expression);
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$dynamic$2d$rendering$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["abortAndThrowOnSynchronousRequestDataAccess"])(route, expression, error, prerenderStore);
            }
        },
        [Symbol.iterator]: {
            value: function() {
                const expression = '`headers()[Symbol.iterator]()`';
                const error = createHeadersAccessError(route, expression);
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$dynamic$2d$rendering$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["abortAndThrowOnSynchronousRequestDataAccess"])(route, expression, error, prerenderStore);
            }
        }
    });
    return promise;
}
function makeUntrackedExoticHeaders(underlyingHeaders) {
    const cachedHeaders = CachedHeaders.get(underlyingHeaders);
    if (cachedHeaders) {
        return cachedHeaders;
    }
    const promise = Promise.resolve(underlyingHeaders);
    CachedHeaders.set(underlyingHeaders, promise);
    Object.defineProperties(promise, {
        append: {
            value: underlyingHeaders.append.bind(underlyingHeaders)
        },
        delete: {
            value: underlyingHeaders.delete.bind(underlyingHeaders)
        },
        get: {
            value: underlyingHeaders.get.bind(underlyingHeaders)
        },
        has: {
            value: underlyingHeaders.has.bind(underlyingHeaders)
        },
        set: {
            value: underlyingHeaders.set.bind(underlyingHeaders)
        },
        getSetCookie: {
            value: underlyingHeaders.getSetCookie.bind(underlyingHeaders)
        },
        forEach: {
            value: underlyingHeaders.forEach.bind(underlyingHeaders)
        },
        keys: {
            value: underlyingHeaders.keys.bind(underlyingHeaders)
        },
        values: {
            value: underlyingHeaders.values.bind(underlyingHeaders)
        },
        entries: {
            value: underlyingHeaders.entries.bind(underlyingHeaders)
        },
        [Symbol.iterator]: {
            value: underlyingHeaders[Symbol.iterator].bind(underlyingHeaders)
        }
    });
    return promise;
}
function makeUntrackedExoticHeadersWithDevWarnings(underlyingHeaders, route) {
    const cachedHeaders = CachedHeaders.get(underlyingHeaders);
    if (cachedHeaders) {
        return cachedHeaders;
    }
    const promise = new Promise((resolve)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$scheduler$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["scheduleImmediate"])(()=>resolve(underlyingHeaders)));
    CachedHeaders.set(underlyingHeaders, promise);
    Object.defineProperties(promise, {
        append: {
            value: function append() {
                const expression = `\`headers().append(${describeNameArg(arguments[0])}, ...)\``;
                syncIODev(route, expression);
                return underlyingHeaders.append.apply(underlyingHeaders, arguments);
            }
        },
        delete: {
            value: function _delete() {
                const expression = `\`headers().delete(${describeNameArg(arguments[0])})\``;
                syncIODev(route, expression);
                return underlyingHeaders.delete.apply(underlyingHeaders, arguments);
            }
        },
        get: {
            value: function get() {
                const expression = `\`headers().get(${describeNameArg(arguments[0])})\``;
                syncIODev(route, expression);
                return underlyingHeaders.get.apply(underlyingHeaders, arguments);
            }
        },
        has: {
            value: function has() {
                const expression = `\`headers().has(${describeNameArg(arguments[0])})\``;
                syncIODev(route, expression);
                return underlyingHeaders.has.apply(underlyingHeaders, arguments);
            }
        },
        set: {
            value: function set() {
                const expression = `\`headers().set(${describeNameArg(arguments[0])}, ...)\``;
                syncIODev(route, expression);
                return underlyingHeaders.set.apply(underlyingHeaders, arguments);
            }
        },
        getSetCookie: {
            value: function getSetCookie() {
                const expression = '`headers().getSetCookie()`';
                syncIODev(route, expression);
                return underlyingHeaders.getSetCookie.apply(underlyingHeaders, arguments);
            }
        },
        forEach: {
            value: function forEach() {
                const expression = '`headers().forEach(...)`';
                syncIODev(route, expression);
                return underlyingHeaders.forEach.apply(underlyingHeaders, arguments);
            }
        },
        keys: {
            value: function keys() {
                const expression = '`headers().keys()`';
                syncIODev(route, expression);
                return underlyingHeaders.keys.apply(underlyingHeaders, arguments);
            }
        },
        values: {
            value: function values() {
                const expression = '`headers().values()`';
                syncIODev(route, expression);
                return underlyingHeaders.values.apply(underlyingHeaders, arguments);
            }
        },
        entries: {
            value: function entries() {
                const expression = '`headers().entries()`';
                syncIODev(route, expression);
                return underlyingHeaders.entries.apply(underlyingHeaders, arguments);
            }
        },
        [Symbol.iterator]: {
            value: function() {
                const expression = '`...headers()` or similar iteration';
                syncIODev(route, expression);
                return underlyingHeaders[Symbol.iterator].apply(underlyingHeaders, arguments);
            }
        }
    });
    return promise;
}
function describeNameArg(arg) {
    return typeof arg === 'string' ? `'${arg}'` : '...';
}
function syncIODev(route, expression) {
    const workUnitStore = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["workUnitAsyncStorage"].getStore();
    if (workUnitStore && workUnitStore.type === 'request' && workUnitStore.prerenderPhase === true) {
        // When we're rendering dynamically in dev we need to advance out of the
        // Prerender environment when we read Request data synchronously
        const requestStore = workUnitStore;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$dynamic$2d$rendering$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["trackSynchronousRequestDataAccessInDev"])(requestStore);
    }
    // In all cases we warn normally
    warnForSyncAccess(route, expression);
}
const noop = ()=>{};
const warnForSyncAccess = ("TURBOPACK compile-time falsy", 0) ? ("TURBOPACK unreachable", undefined) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$create$2d$deduped$2d$by$2d$callsite$2d$server$2d$error$2d$logger$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["createDedupedByCallsiteServerErrorLoggerDev"])(createHeadersAccessError);
function createHeadersAccessError(route, expression) {
    const prefix = route ? `Route "${route}" ` : 'This route ';
    return new Error(`${prefix}used ${expression}. ` + `\`headers()\` should be awaited before using its value. ` + `Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`);
} //# sourceMappingURL=headers.js.map
}}),
"[project]/node_modules/next/dist/esm/client/components/hooks-server-context.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "DynamicServerError": (()=>DynamicServerError),
    "isDynamicServerError": (()=>isDynamicServerError)
});
const DYNAMIC_ERROR_CODE = 'DYNAMIC_SERVER_USAGE';
class DynamicServerError extends Error {
    constructor(description){
        super("Dynamic server usage: " + description);
        this.description = description;
        this.digest = DYNAMIC_ERROR_CODE;
    }
}
function isDynamicServerError(err) {
    if (typeof err !== 'object' || err === null || !('digest' in err) || typeof err.digest !== 'string') {
        return false;
    }
    return err.digest === DYNAMIC_ERROR_CODE;
} //# sourceMappingURL=hooks-server-context.js.map
}}),
"[project]/node_modules/next/dist/esm/server/request/draft-mode.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "draftMode": (()=>draftMode)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2e$external$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/next/dist/esm/server/app-render/work-unit-async-storage.external.js [middleware] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2e$external$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/next/dist/esm/server/app-render/work-async-storage.external.js [middleware] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$dynamic$2d$rendering$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/esm/server/app-render/dynamic-rendering.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$create$2d$deduped$2d$by$2d$callsite$2d$server$2d$error$2d$logger$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/esm/server/create-deduped-by-callsite-server-error-logger.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$static$2d$generation$2d$bailout$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/esm/client/components/static-generation-bailout.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$hooks$2d$server$2d$context$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/esm/client/components/hooks-server-context.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/esm/server/app-render/work-async-storage-instance.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/esm/server/app-render/work-unit-async-storage-instance.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2e$external$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/next/dist/esm/server/app-render/work-unit-async-storage.external.js [middleware] (ecmascript) <locals>");
;
;
;
;
;
;
;
function draftMode() {
    const callingExpression = 'draftMode';
    const workStore = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["workAsyncStorage"].getStore();
    const workUnitStore = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["workUnitAsyncStorage"].getStore();
    if (workUnitStore) {
        if (workStore && workUnitStore.phase === 'after') {
            throw new Error(`Route ${workStore.route} used "draftMode" inside "unstable_after(...)". This is not supported, because "unstable_after(...)" runs after the request is finished and cannot affect the response. See more info here: https://nextjs.org/docs/canary/app/api-reference/functions/unstable_after`);
        }
        if (workUnitStore.type === 'cache' || workUnitStore.type === 'unstable-cache' || workUnitStore.type === 'prerender' || workUnitStore.type === 'prerender-ppr' || workUnitStore.type === 'prerender-legacy') {
            // Return empty draft mode
            if (("TURBOPACK compile-time value", "development") === 'development' && !(workStore == null ? void 0 : workStore.isPrefetchRequest)) {
                const route = workStore == null ? void 0 : workStore.route;
                return createExoticDraftModeWithDevWarnings(null, route);
            } else {
                return createExoticDraftMode(null);
            }
        }
    }
    const requestStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2e$external$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getExpectedRequestStore"])(callingExpression);
    const cachedDraftMode = CachedDraftModes.get(requestStore.draftMode);
    if (cachedDraftMode) {
        return cachedDraftMode;
    }
    let promise;
    if (("TURBOPACK compile-time value", "development") === 'development' && !(workStore == null ? void 0 : workStore.isPrefetchRequest)) {
        const route = workStore == null ? void 0 : workStore.route;
        promise = createExoticDraftModeWithDevWarnings(requestStore.draftMode, route);
    } else {
        promise = createExoticDraftMode(requestStore.draftMode);
    }
    CachedDraftModes.set(requestStore.draftMode, promise);
    return promise;
}
const CachedDraftModes = new WeakMap();
function createExoticDraftMode(underlyingProvider) {
    const instance = new DraftMode(underlyingProvider);
    const promise = Promise.resolve(instance);
    Object.defineProperty(promise, 'isEnabled', {
        get () {
            return instance.isEnabled;
        },
        set (newValue) {
            Object.defineProperty(promise, 'isEnabled', {
                value: newValue,
                writable: true,
                enumerable: true
            });
        },
        enumerable: true,
        configurable: true
    });
    promise.enable = instance.enable.bind(instance);
    promise.disable = instance.disable.bind(instance);
    return promise;
}
function createExoticDraftModeWithDevWarnings(underlyingProvider, route) {
    const instance = new DraftMode(underlyingProvider);
    const promise = Promise.resolve(instance);
    Object.defineProperty(promise, 'isEnabled', {
        get () {
            const expression = '`draftMode().isEnabled`';
            syncIODev(route, expression);
            return instance.isEnabled;
        },
        set (newValue) {
            Object.defineProperty(promise, 'isEnabled', {
                value: newValue,
                writable: true,
                enumerable: true
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(promise, 'enable', {
        value: function get() {
            const expression = '`draftMode().enable()`';
            syncIODev(route, expression);
            return instance.enable.apply(instance, arguments);
        }
    });
    Object.defineProperty(promise, 'disable', {
        value: function get() {
            const expression = '`draftMode().disable()`';
            syncIODev(route, expression);
            return instance.disable.apply(instance, arguments);
        }
    });
    return promise;
}
class DraftMode {
    constructor(provider){
        this._provider = provider;
    }
    get isEnabled() {
        if (this._provider !== null) {
            return this._provider.isEnabled;
        }
        return false;
    }
    enable() {
        // We we have a store we want to track dynamic data access to ensure we
        // don't statically generate routes that manipulate draft mode.
        trackDynamicDraftMode('draftMode().enable()');
        if (this._provider !== null) {
            this._provider.enable();
        }
    }
    disable() {
        trackDynamicDraftMode('draftMode().disable()');
        if (this._provider !== null) {
            this._provider.disable();
        }
    }
}
function syncIODev(route, expression) {
    const workUnitStore = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["workUnitAsyncStorage"].getStore();
    if (workUnitStore && workUnitStore.type === 'request' && workUnitStore.prerenderPhase === true) {
        // When we're rendering dynamically in dev we need to advance out of the
        // Prerender environment when we read Request data synchronously
        const requestStore = workUnitStore;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$dynamic$2d$rendering$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["trackSynchronousRequestDataAccessInDev"])(requestStore);
    }
    // In all cases we warn normally
    warnForSyncAccess(route, expression);
}
const noop = ()=>{};
const warnForSyncAccess = ("TURBOPACK compile-time falsy", 0) ? ("TURBOPACK unreachable", undefined) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$create$2d$deduped$2d$by$2d$callsite$2d$server$2d$error$2d$logger$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["createDedupedByCallsiteServerErrorLoggerDev"])(createDraftModeAccessError);
function createDraftModeAccessError(route, expression) {
    const prefix = route ? `Route "${route}" ` : 'This route ';
    return new Error(`${prefix}used ${expression}. ` + `\`draftMode()\` should be awaited before using its value. ` + `Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`);
}
function trackDynamicDraftMode(expression) {
    const store = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["workAsyncStorage"].getStore();
    const workUnitStore = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["workUnitAsyncStorage"].getStore();
    if (store) {
        // We we have a store we want to track dynamic data access to ensure we
        // don't statically generate routes that manipulate draft mode.
        if (workUnitStore) {
            if (workUnitStore.type === 'cache') {
                throw new Error(`Route ${store.route} used "${expression}" inside "use cache". The enabled status of draftMode can be read in caches but you must not enable or disable draftMode inside a cache. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`);
            } else if (workUnitStore.type === 'unstable-cache') {
                throw new Error(`Route ${store.route} used "${expression}" inside a function cached with "unstable_cache(...)". The enabled status of draftMode can be read in caches but you must not enable or disable draftMode inside a cache. See more info here: https://nextjs.org/docs/app/api-reference/functions/unstable_cache`);
            }
        }
        if (store.dynamicShouldError) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$static$2d$generation$2d$bailout$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["StaticGenBailoutError"](`Route ${store.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`${expression}\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`);
        }
        if (workUnitStore) {
            if (workUnitStore.type === 'prerender') {
                // dynamicIO Prerender
                const error = new Error(`Route ${store.route} used ${expression} without first calling \`await connection()\`. See more info here: https://nextjs.org/docs/messages/next-prerender-sync-headers`);
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$dynamic$2d$rendering$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["abortAndThrowOnSynchronousRequestDataAccess"])(store.route, expression, error, workUnitStore);
            } else if (workUnitStore.type === 'prerender-ppr') {
                // PPR Prerender
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$dynamic$2d$rendering$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["postponeWithTracking"])(store.route, expression, workUnitStore.dynamicTracking);
            } else if (workUnitStore.type === 'prerender-legacy') {
                // legacy Prerender
                workUnitStore.revalidate = 0;
                const err = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$hooks$2d$server$2d$context$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["DynamicServerError"](`Route ${store.route} couldn't be rendered statically because it used \`${expression}\`. See more info here: https://nextjs.org/docs/messages/dynamic-server-error`);
                store.dynamicUsageDescription = expression;
                store.dynamicUsageStack = err.stack;
                throw err;
            } else if (("TURBOPACK compile-time value", "development") === 'development' && workUnitStore && workUnitStore.type === 'request') {
                workUnitStore.usedDynamic = true;
            }
        }
    }
} //# sourceMappingURL=draft-mode.js.map
}}),
"[project]/node_modules/next/dist/esm/api/headers.js [middleware] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({});
;
;
;
 //# sourceMappingURL=headers.js.map
}}),
"[project]/node_modules/next/dist/esm/api/headers.js [middleware] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, t: require } = __turbopack_context__;
{
__turbopack_esm__({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2f$cookies$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/esm/server/request/cookies.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2f$headers$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/esm/server/request/headers.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2f$draft$2d$mode$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/esm/server/request/draft-mode.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$headers$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/next/dist/esm/api/headers.js [middleware] (ecmascript) <locals>");
}}),
"[project]/node_modules/next-auth/lib/index.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "initAuth": (()=>initAuth)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/@auth/core/index.js [middleware] (ecmascript) <module evaluation>");
// @ts-expect-error Next.js does not yet correctly use the `package.json#exports` field
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$headers$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/next/dist/esm/api/headers.js [middleware] (ecmascript) <module evaluation>");
// @ts-expect-error Next.js does not yet correctly use the `package.json#exports` field
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/next/dist/esm/api/server.js [middleware] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$lib$2f$env$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next-auth/lib/env.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$utils$2f$env$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@auth/core/lib/utils/env.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/@auth/core/index.js [middleware] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2f$headers$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/esm/server/request/headers.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/esm/server/web/spec-extension/response.js [middleware] (ecmascript)");
;
;
;
;
async function getSession(headers, config) {
    const url = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$utils$2f$env$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["createActionURL"])("session", // @ts-expect-error `x-forwarded-proto` is not nullable, next.js sets it by default
    headers.get("x-forwarded-proto"), headers, process.env, config);
    const request = new Request(url, {
        headers: {
            cookie: headers.get("cookie") ?? ""
        }
    });
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Auth"])(request, {
        ...config,
        callbacks: {
            ...config.callbacks,
            // Since we are server-side, we don't need to filter out the session data
            // See https://authjs.dev/getting-started/migrating-to-v5#authenticating-server-side
            // TODO: Taint the session data to prevent accidental leakage to the client
            // https://react.dev/reference/react/experimental_taintObjectReference
            async session (...args) {
                const session = // If the user defined a custom session callback, use that instead
                await config.callbacks?.session?.(...args) ?? {
                    ...args[0].session,
                    expires: args[0].session.expires?.toISOString?.() ?? args[0].session.expires
                };
                const user = args[0].user ?? args[0].token;
                return {
                    user,
                    ...session
                };
            }
        }
    });
}
function isReqWrapper(arg) {
    return typeof arg === "function";
}
function initAuth(config, onLazyLoad // To set the default env vars
) {
    if (typeof config === "function") {
        return async (...args)=>{
            if (!args.length) {
                // React Server Components
                const _headers = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2f$headers$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["headers"])();
                const _config = await config(undefined); // Review: Should we pass headers() here instead?
                onLazyLoad?.(_config);
                return getSession(_headers, _config).then((r)=>r.json());
            }
            if (args[0] instanceof Request) {
                // middleware.ts inline
                // export { auth as default } from "auth"
                const req = args[0];
                const ev = args[1];
                const _config = await config(req);
                onLazyLoad?.(_config);
                // args[0] is supposed to be NextRequest but the instanceof check is failing.
                return handleAuth([
                    req,
                    ev
                ], _config);
            }
            if (isReqWrapper(args[0])) {
                // middleware.ts wrapper/route.ts
                // import { auth } from "auth"
                // export default auth((req) => { console.log(req.auth) }})
                const userMiddlewareOrRoute = args[0];
                return async (...args)=>{
                    const _config = await config(args[0]);
                    onLazyLoad?.(_config);
                    return handleAuth(args, _config, userMiddlewareOrRoute);
                };
            }
            // API Routes, getServerSideProps
            const request = "req" in args[0] ? args[0].req : args[0];
            const response = "res" in args[0] ? args[0].res : args[1];
            const _config = await config(request);
            onLazyLoad?.(_config);
            // @ts-expect-error -- request is NextRequest
            return getSession(new Headers(request.headers), _config).then(async (authResponse)=>{
                const auth = await authResponse.json();
                for (const cookie of authResponse.headers.getSetCookie())if ("headers" in response) response.headers.append("set-cookie", cookie);
                else response.appendHeader("set-cookie", cookie);
                return auth;
            });
        };
    }
    return (...args)=>{
        if (!args.length) {
            // React Server Components
            return Promise.resolve((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2f$headers$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["headers"])()).then((h)=>getSession(h, config).then((r)=>r.json()));
        }
        if (args[0] instanceof Request) {
            // middleware.ts inline
            // export { auth as default } from "auth"
            const req = args[0];
            const ev = args[1];
            return handleAuth([
                req,
                ev
            ], config);
        }
        if (isReqWrapper(args[0])) {
            // middleware.ts wrapper/route.ts
            // import { auth } from "auth"
            // export default auth((req) => { console.log(req.auth) }})
            const userMiddlewareOrRoute = args[0];
            return async (...args)=>{
                return handleAuth(args, config, userMiddlewareOrRoute).then((res)=>{
                    return res;
                });
            };
        }
        // API Routes, getServerSideProps
        const request = "req" in args[0] ? args[0].req : args[0];
        const response = "res" in args[0] ? args[0].res : args[1];
        return getSession(// @ts-expect-error
        new Headers(request.headers), config).then(async (authResponse)=>{
            const auth = await authResponse.json();
            for (const cookie of authResponse.headers.getSetCookie())if ("headers" in response) response.headers.append("set-cookie", cookie);
            else response.appendHeader("set-cookie", cookie);
            return auth;
        });
    };
}
async function handleAuth(args, config, userMiddlewareOrRoute) {
    const request = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$lib$2f$env$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["reqWithEnvURL"])(args[0]);
    const sessionResponse = await getSession(request.headers, config);
    const auth = await sessionResponse.json();
    let authorized = true;
    if (config.callbacks?.authorized) {
        authorized = await config.callbacks.authorized({
            request,
            auth
        });
    }
    let response = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"].next?.();
    if (authorized instanceof Response) {
        // User returned a custom response, like redirecting to a page or 401, respect it
        response = authorized;
        const redirect = authorized.headers.get("Location");
        const { pathname } = request.nextUrl;
        // If the user is redirecting to the same NextAuth.js action path as the current request,
        // don't allow the redirect to prevent an infinite loop
        if (redirect && isSameAuthAction(pathname, new URL(redirect).pathname, config)) {
            authorized = true;
        }
    } else if (userMiddlewareOrRoute) {
        // Execute user's middleware/handler with the augmented request
        const augmentedReq = request;
        augmentedReq.auth = auth;
        response = await userMiddlewareOrRoute(augmentedReq, args[1]) ?? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"].next();
    } else if (!authorized) {
        const signInPage = config.pages?.signIn ?? `${config.basePath}/signin`;
        if (request.nextUrl.pathname !== signInPage) {
            // Redirect to signin page by default if not authorized
            const signInUrl = request.nextUrl.clone();
            signInUrl.pathname = signInPage;
            signInUrl.searchParams.set("callbackUrl", request.nextUrl.href);
            response = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"].redirect(signInUrl);
        }
    }
    const finalResponse = new Response(response?.body, response);
    // Preserve cookies from the session response
    for (const cookie of sessionResponse.headers.getSetCookie())finalResponse.headers.append("set-cookie", cookie);
    return finalResponse;
}
function isSameAuthAction(requestPath, redirectPath, config) {
    const action = redirectPath.replace(`${requestPath}/`, "");
    const pages = Object.values(config.pages ?? {});
    return (actions.has(action) || pages.includes(redirectPath)) && redirectPath === requestPath;
}
const actions = new Set([
    "providers",
    "session",
    "csrf",
    "signin",
    "signout",
    "callback",
    "verify-request",
    "error"
]);
}}),
"[project]/node_modules/next/dist/esm/client/components/redirect-status-code.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "RedirectStatusCode": (()=>RedirectStatusCode)
});
var RedirectStatusCode;
(function(RedirectStatusCode) {
    RedirectStatusCode[RedirectStatusCode["SeeOther"] = 303] = "SeeOther";
    RedirectStatusCode[RedirectStatusCode["TemporaryRedirect"] = 307] = "TemporaryRedirect";
    RedirectStatusCode[RedirectStatusCode["PermanentRedirect"] = 308] = "PermanentRedirect";
})(RedirectStatusCode || (RedirectStatusCode = {})); //# sourceMappingURL=redirect-status-code.js.map
}}),
"[project]/node_modules/next/dist/esm/client/components/redirect.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "RedirectType": (()=>RedirectType),
    "getRedirectError": (()=>getRedirectError),
    "getRedirectStatusCodeFromError": (()=>getRedirectStatusCodeFromError),
    "getRedirectTypeFromError": (()=>getRedirectTypeFromError),
    "getURLFromRedirectError": (()=>getURLFromRedirectError),
    "isRedirectError": (()=>isRedirectError),
    "permanentRedirect": (()=>permanentRedirect),
    "redirect": (()=>redirect)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$action$2d$async$2d$storage$2e$external$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/next/dist/esm/server/app-render/action-async-storage.external.js [middleware] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$redirect$2d$status$2d$code$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/esm/client/components/redirect-status-code.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$action$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/esm/server/app-render/action-async-storage-instance.js [middleware] (ecmascript)");
;
;
const REDIRECT_ERROR_CODE = 'NEXT_REDIRECT';
var RedirectType;
(function(RedirectType) {
    RedirectType["push"] = "push";
    RedirectType["replace"] = "replace";
})(RedirectType || (RedirectType = {}));
function getRedirectError(url, type, statusCode) {
    if (statusCode === void 0) statusCode = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$redirect$2d$status$2d$code$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["RedirectStatusCode"].TemporaryRedirect;
    const error = new Error(REDIRECT_ERROR_CODE);
    error.digest = REDIRECT_ERROR_CODE + ";" + type + ";" + url + ";" + statusCode + ";";
    return error;
}
function redirect(/** The URL to redirect to */ url, type) {
    const actionStore = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$action$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["actionAsyncStorage"].getStore();
    const redirectType = type || ((actionStore == null ? void 0 : actionStore.isAction) ? "push" : "replace");
    throw getRedirectError(url, redirectType, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$redirect$2d$status$2d$code$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["RedirectStatusCode"].TemporaryRedirect);
}
function permanentRedirect(/** The URL to redirect to */ url, type) {
    if (type === void 0) type = "replace";
    throw getRedirectError(url, type, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$redirect$2d$status$2d$code$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["RedirectStatusCode"].PermanentRedirect);
}
function isRedirectError(error) {
    if (typeof error !== 'object' || error === null || !('digest' in error) || typeof error.digest !== 'string') {
        return false;
    }
    const digest = error.digest.split(';');
    const [errorCode, type] = digest;
    const destination = digest.slice(2, -2).join(';');
    const status = digest.at(-2);
    const statusCode = Number(status);
    return errorCode === REDIRECT_ERROR_CODE && (type === 'replace' || type === 'push') && typeof destination === 'string' && !isNaN(statusCode) && statusCode in __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$redirect$2d$status$2d$code$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["RedirectStatusCode"];
}
function getURLFromRedirectError(error) {
    if (!isRedirectError(error)) return null;
    // Slices off the beginning of the digest that contains the code and the
    // separating ';'.
    return error.digest.split(';').slice(2, -2).join(';');
}
function getRedirectTypeFromError(error) {
    if (!isRedirectError(error)) {
        throw new Error('Not a redirect error');
    }
    return error.digest.split(';', 2)[1];
}
function getRedirectStatusCodeFromError(error) {
    if (!isRedirectError(error)) {
        throw new Error('Not a redirect error');
    }
    return Number(error.digest.split(';').at(-2));
} //# sourceMappingURL=redirect.js.map
}}),
"[project]/node_modules/next/dist/esm/client/components/not-found.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "isNotFoundError": (()=>isNotFoundError),
    "notFound": (()=>notFound)
});
const NOT_FOUND_ERROR_CODE = 'NEXT_NOT_FOUND';
function notFound() {
    // eslint-disable-next-line no-throw-literal
    const error = new Error(NOT_FOUND_ERROR_CODE);
    error.digest = NOT_FOUND_ERROR_CODE;
    throw error;
}
function isNotFoundError(error) {
    if (typeof error !== 'object' || error === null || !('digest' in error)) {
        return false;
    }
    return error.digest === NOT_FOUND_ERROR_CODE;
} //# sourceMappingURL=not-found.js.map
}}),
"[project]/node_modules/next/dist/esm/shared/lib/lazy-dynamic/bailout-to-csr.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
// This has to be a shared module which is shared between client component error boundary and dynamic component
__turbopack_esm__({
    "BailoutToCSRError": (()=>BailoutToCSRError),
    "isBailoutToCSRError": (()=>isBailoutToCSRError)
});
const BAILOUT_TO_CSR = 'BAILOUT_TO_CLIENT_SIDE_RENDERING';
class BailoutToCSRError extends Error {
    constructor(reason){
        super("Bail out to client-side rendering: " + reason);
        this.reason = reason;
        this.digest = BAILOUT_TO_CSR;
    }
}
function isBailoutToCSRError(err) {
    if (typeof err !== 'object' || err === null || !('digest' in err)) {
        return false;
    }
    return err.digest === BAILOUT_TO_CSR;
} //# sourceMappingURL=bailout-to-csr.js.map
}}),
"[project]/node_modules/next/dist/esm/client/components/is-next-router-error.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "isNextRouterError": (()=>isNextRouterError)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$not$2d$found$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/esm/client/components/not-found.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$redirect$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/esm/client/components/redirect.js [middleware] (ecmascript)");
;
;
function isNextRouterError(error) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$redirect$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["isRedirectError"])(error) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$not$2d$found$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["isNotFoundError"])(error);
} //# sourceMappingURL=is-next-router-error.js.map
}}),
"[project]/node_modules/next/dist/esm/export/helpers/is-dynamic-usage-error.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "isDynamicUsageError": (()=>isDynamicUsageError)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$hooks$2d$server$2d$context$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/esm/client/components/hooks-server-context.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$lazy$2d$dynamic$2f$bailout$2d$to$2d$csr$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/esm/shared/lib/lazy-dynamic/bailout-to-csr.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$is$2d$next$2d$router$2d$error$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/esm/client/components/is-next-router-error.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$dynamic$2d$rendering$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/esm/server/app-render/dynamic-rendering.js [middleware] (ecmascript)");
;
;
;
;
const isDynamicUsageError = (err)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$hooks$2d$server$2d$context$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["isDynamicServerError"])(err) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$lazy$2d$dynamic$2f$bailout$2d$to$2d$csr$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["isBailoutToCSRError"])(err) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$is$2d$next$2d$router$2d$error$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["isNextRouterError"])(err) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$dynamic$2d$rendering$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["isDynamicPostpone"])(err); //# sourceMappingURL=is-dynamic-usage-error.js.map
}}),
"[project]/node_modules/next/dist/esm/server/lib/router-utils/is-postpone.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "isPostpone": (()=>isPostpone)
});
const REACT_POSTPONE_TYPE = Symbol.for('react.postpone');
function isPostpone(error) {
    return typeof error === 'object' && error !== null && error.$$typeof === REACT_POSTPONE_TYPE;
} //# sourceMappingURL=is-postpone.js.map
}}),
"[project]/node_modules/next/dist/esm/client/components/unstable-rethrow.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "unstable_rethrow": (()=>unstable_rethrow)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$export$2f$helpers$2f$is$2d$dynamic$2d$usage$2d$error$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/esm/export/helpers/is-dynamic-usage-error.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$router$2d$utils$2f$is$2d$postpone$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/esm/server/lib/router-utils/is-postpone.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$lazy$2d$dynamic$2f$bailout$2d$to$2d$csr$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/esm/shared/lib/lazy-dynamic/bailout-to-csr.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$is$2d$next$2d$router$2d$error$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/esm/client/components/is-next-router-error.js [middleware] (ecmascript)");
;
;
;
;
function unstable_rethrow(error) {
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$is$2d$next$2d$router$2d$error$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["isNextRouterError"])(error) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$lazy$2d$dynamic$2f$bailout$2d$to$2d$csr$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["isBailoutToCSRError"])(error) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$export$2f$helpers$2f$is$2d$dynamic$2d$usage$2d$error$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["isDynamicUsageError"])(error) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$router$2d$utils$2f$is$2d$postpone$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["isPostpone"])(error)) {
        throw error;
    }
    if (error instanceof Error && 'cause' in error) {
        unstable_rethrow(error.cause);
    }
} //# sourceMappingURL=unstable-rethrow.js.map
}}),
"[project]/node_modules/next/dist/esm/client/components/navigation.react-server.js [middleware] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
/** @internal */ __turbopack_esm__({
    "ReadonlyURLSearchParams": (()=>ReadonlyURLSearchParams)
});
class ReadonlyURLSearchParamsError extends Error {
    constructor(){
        super('Method unavailable on `ReadonlyURLSearchParams`. Read more: https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams');
    }
}
class ReadonlyURLSearchParams extends URLSearchParams {
    /** @deprecated Method unavailable on `ReadonlyURLSearchParams`. Read more: https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams */ append() {
        throw new ReadonlyURLSearchParamsError();
    }
    /** @deprecated Method unavailable on `ReadonlyURLSearchParams`. Read more: https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams */ delete() {
        throw new ReadonlyURLSearchParamsError();
    }
    /** @deprecated Method unavailable on `ReadonlyURLSearchParams`. Read more: https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams */ set() {
        throw new ReadonlyURLSearchParamsError();
    }
    /** @deprecated Method unavailable on `ReadonlyURLSearchParams`. Read more: https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams */ sort() {
        throw new ReadonlyURLSearchParamsError();
    }
}
;
;
;
;
 //# sourceMappingURL=navigation.react-server.js.map
}}),
"[project]/node_modules/next/dist/esm/client/components/navigation.react-server.js [middleware] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, t: require } = __turbopack_context__;
{
__turbopack_esm__({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$redirect$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/esm/client/components/redirect.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$not$2d$found$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/esm/client/components/not-found.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$unstable$2d$rethrow$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/esm/client/components/unstable-rethrow.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/next/dist/esm/client/components/navigation.react-server.js [middleware] (ecmascript) <locals>");
}}),
"[project]/node_modules/next/dist/esm/api/navigation.react-server.js [middleware] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({});
;
 //# sourceMappingURL=navigation.react-server.js.map
}}),
"[project]/node_modules/next/dist/esm/api/navigation.react-server.js [middleware] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, t: require } = __turbopack_context__;
{
__turbopack_esm__({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/next/dist/esm/client/components/navigation.react-server.js [middleware] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/next/dist/esm/api/navigation.react-server.js [middleware] (ecmascript) <locals>");
}}),
"[project]/node_modules/next-auth/lib/actions.js [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "signIn": (()=>signIn),
    "signOut": (()=>signOut),
    "update": (()=>update)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/@auth/core/index.js [middleware] (ecmascript) <module evaluation>");
// @ts-expect-error Next.js does not yet correctly use the `package.json#exports` field
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$headers$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/next/dist/esm/api/headers.js [middleware] (ecmascript) <module evaluation>");
// @ts-expect-error Next.js does not yet correctly use the `package.json#exports` field
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/next/dist/esm/api/navigation.react-server.js [middleware] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2f$headers$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/esm/server/request/headers.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$utils$2f$env$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@auth/core/lib/utils/env.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$redirect$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/esm/client/components/redirect.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/@auth/core/index.js [middleware] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$symbols$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@auth/core/lib/symbols.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2f$cookies$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/esm/server/request/cookies.js [middleware] (ecmascript)");
;
;
;
async function signIn(provider, options = {}, authorizationParams, config) {
    const headers = new Headers(await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2f$headers$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["headers"])());
    const { redirect: shouldRedirect = true, redirectTo, ...rest } = options instanceof FormData ? Object.fromEntries(options) : options;
    const callbackUrl = redirectTo?.toString() ?? headers.get("Referer") ?? "/";
    const signInURL = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$utils$2f$env$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["createActionURL"])("signin", // @ts-expect-error `x-forwarded-proto` is not nullable, next.js sets it by default
    headers.get("x-forwarded-proto"), headers, process.env, config);
    if (!provider) {
        signInURL.searchParams.append("callbackUrl", callbackUrl);
        if (shouldRedirect) (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$redirect$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["redirect"])(signInURL.toString());
        return signInURL.toString();
    }
    let url = `${signInURL}/${provider}?${new URLSearchParams(authorizationParams)}`;
    let foundProvider = {};
    for (const providerConfig of config.providers){
        const { options, ...defaults } = typeof providerConfig === "function" ? providerConfig() : providerConfig;
        const id = options?.id ?? defaults.id;
        if (id === provider) {
            foundProvider = {
                id,
                type: options?.type ?? defaults.type
            };
            break;
        }
    }
    if (!foundProvider.id) {
        const url = `${signInURL}?${new URLSearchParams({
            callbackUrl
        })}`;
        if (shouldRedirect) (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$redirect$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["redirect"])(url);
        return url;
    }
    if (foundProvider.type === "credentials") {
        url = url.replace("signin", "callback");
    }
    headers.set("Content-Type", "application/x-www-form-urlencoded");
    const body = new URLSearchParams({
        ...rest,
        callbackUrl
    });
    const req = new Request(url, {
        method: "POST",
        headers,
        body
    });
    const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Auth"])(req, {
        ...config,
        raw: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$symbols$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["raw"],
        skipCSRFCheck: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$symbols$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["skipCSRFCheck"]
    });
    const cookieJar = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2f$cookies$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["cookies"])();
    for (const c of res?.cookies ?? [])cookieJar.set(c.name, c.value, c.options);
    const responseUrl = res instanceof Response ? res.headers.get("Location") : res.redirect;
    // NOTE: if for some unexpected reason the responseUrl is not set,
    // we redirect to the original url
    const redirectUrl = responseUrl ?? url;
    if (shouldRedirect) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$redirect$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["redirect"])(redirectUrl);
    return redirectUrl;
}
async function signOut(options, config) {
    const headers = new Headers(await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2f$headers$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["headers"])());
    headers.set("Content-Type", "application/x-www-form-urlencoded");
    const url = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$utils$2f$env$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["createActionURL"])("signout", // @ts-expect-error `x-forwarded-proto` is not nullable, next.js sets it by default
    headers.get("x-forwarded-proto"), headers, process.env, config);
    const callbackUrl = options?.redirectTo ?? headers.get("Referer") ?? "/";
    const body = new URLSearchParams({
        callbackUrl
    });
    const req = new Request(url, {
        method: "POST",
        headers,
        body
    });
    const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Auth"])(req, {
        ...config,
        raw: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$symbols$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["raw"],
        skipCSRFCheck: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$symbols$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["skipCSRFCheck"]
    });
    const cookieJar = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2f$cookies$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["cookies"])();
    for (const c of res?.cookies ?? [])cookieJar.set(c.name, c.value, c.options);
    if (options?.redirect ?? true) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$redirect$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["redirect"])(res.redirect);
    return res;
}
async function update(data, config) {
    const headers = new Headers(await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2f$headers$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["headers"])());
    headers.set("Content-Type", "application/json");
    const url = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$utils$2f$env$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["createActionURL"])("session", // @ts-expect-error `x-forwarded-proto` is not nullable, next.js sets it by default
    headers.get("x-forwarded-proto"), headers, process.env, config);
    const body = JSON.stringify({
        data
    });
    const req = new Request(url, {
        method: "POST",
        headers,
        body
    });
    const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Auth"])(req, {
        ...config,
        raw: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$symbols$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["raw"],
        skipCSRFCheck: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$symbols$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["skipCSRFCheck"]
    });
    const cookieJar = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2f$cookies$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["cookies"])();
    for (const c of res?.cookies ?? [])cookieJar.set(c.name, c.value, c.options);
    return res.body;
}
}}),
"[project]/node_modules/next-auth/index.js [middleware] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
/**
 * _If you are looking to migrate from v4, visit the [Upgrade Guide (v5)](https://authjs.dev/getting-started/migrating-to-v5)._
 *
 * ## Installation
 *
 * ```bash npm2yarn
 * npm install next-auth@beta
 * ```
 *
 * ## Environment variable inference
 *
 * `NEXTAUTH_URL` and `NEXTAUTH_SECRET` have been inferred since v4.
 *
 * Since NextAuth.js v5 can also automatically infer environment variables that are prefixed with `AUTH_`.
 *
 * For example `AUTH_GITHUB_ID` and `AUTH_GITHUB_SECRET` will be used as the `clientId` and `clientSecret` options for the GitHub provider.
 *
 * :::tip
 * The environment variable name inferring has the following format for OAuth providers: `AUTH_{PROVIDER}_{ID|SECRET}`.
 *
 * `PROVIDER` is the uppercase snake case version of the provider's id, followed by either `ID` or `SECRET` respectively.
 * :::
 *
 * `AUTH_SECRET` and `AUTH_URL` are also aliased for `NEXTAUTH_SECRET` and `NEXTAUTH_URL` for consistency.
 *
 * To add social login to your app, the configuration becomes:
 *
 * ```ts title="auth.ts"
 * import NextAuth from "next-auth"
 * import GitHub from "next-auth/providers/github"
 * export const { handlers, auth } = NextAuth({ providers: [ GitHub ] })
 * ```
 *
 * And the `.env.local` file:
 *
 * ```sh title=".env.local"
 * AUTH_GITHUB_ID=...
 * AUTH_GITHUB_SECRET=...
 * AUTH_SECRET=...
 * ```
 *
 * :::tip
 * In production, `AUTH_SECRET` is a required environment variable - if not set, NextAuth.js will throw an error. See [MissingSecretError](https://authjs.dev/reference/core/errors#missingsecret) for more details.
 * :::
 *
 * If you need to override the default values for a provider, you can still call it as a function `GitHub({...})` as before.
 *
 * ## Lazy initialization
 * You can also initialize NextAuth.js lazily (previously known as advanced intialization), which allows you to access the request context in the configuration in some cases, like Route Handlers, Middleware, API Routes or `getServerSideProps`.
 * The above example becomes:
 *
 * ```ts title="auth.ts"
 * import NextAuth from "next-auth"
 * import GitHub from "next-auth/providers/github"
 * export const { handlers, auth } = NextAuth(req => {
 *  if (req) {
 *   console.log(req) // do something with the request
 *  }
 *  return { providers: [ GitHub ] }
 * })
 * ```
 *
 * :::tip
 * This is useful if you want to customize the configuration based on the request, for example, to add a different provider in staging/dev environments.
 * :::
 *
 * @module next-auth
 */ __turbopack_esm__({
    "default": (()=>NextAuth)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$lib$2f$env$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next-auth/lib/env.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/@auth/core/index.js [middleware] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$lib$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next-auth/lib/index.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$lib$2f$actions$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next-auth/lib/actions.js [middleware] (ecmascript)");
;
;
;
;
;
;
function NextAuth(config) {
    if (typeof config === "function") {
        const httpHandler = async (req)=>{
            const _config = await config(req);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$lib$2f$env$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["setEnvDefaults"])(_config);
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Auth"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$lib$2f$env$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["reqWithEnvURL"])(req), _config);
        };
        return {
            handlers: {
                GET: httpHandler,
                POST: httpHandler
            },
            // @ts-expect-error
            auth: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$lib$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["initAuth"])(config, (c)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$lib$2f$env$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["setEnvDefaults"])(c)),
            signIn: async (provider, options, authorizationParams)=>{
                const _config = await config(undefined);
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$lib$2f$env$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["setEnvDefaults"])(_config);
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$lib$2f$actions$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["signIn"])(provider, options, authorizationParams, _config);
            },
            signOut: async (options)=>{
                const _config = await config(undefined);
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$lib$2f$env$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["setEnvDefaults"])(_config);
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$lib$2f$actions$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["signOut"])(options, _config);
            },
            unstable_update: async (data)=>{
                const _config = await config(undefined);
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$lib$2f$env$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["setEnvDefaults"])(_config);
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$lib$2f$actions$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["update"])(data, _config);
            }
        };
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$lib$2f$env$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["setEnvDefaults"])(config);
    const httpHandler = (req)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Auth"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$lib$2f$env$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["reqWithEnvURL"])(req), config);
    return {
        handlers: {
            GET: httpHandler,
            POST: httpHandler
        },
        // @ts-expect-error
        auth: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$lib$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["initAuth"])(config),
        signIn: (provider, options, authorizationParams)=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$lib$2f$actions$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["signIn"])(provider, options, authorizationParams, config);
        },
        signOut: (options)=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$lib$2f$actions$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["signOut"])(options, config);
        },
        unstable_update: (data)=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$lib$2f$actions$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["update"])(data, config);
        }
    };
}
}}),
"[project]/node_modules/next-auth/index.js [middleware] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, t: require } = __turbopack_context__;
{
__turbopack_esm__({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/@auth/core/index.js [middleware] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$lib$2f$env$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next-auth/lib/env.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$lib$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next-auth/lib/index.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$lib$2f$actions$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next-auth/lib/actions.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$errors$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@auth/core/errors.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/next-auth/index.js [middleware] (ecmascript) <locals>");
}}),
"[project]/node_modules/next/dist/esm/build/templates/middleware.js { INNER_MIDDLEWARE_MODULE => \"[project]/middleware.ts [middleware] (ecmascript)\" } [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>nHandler)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$globals$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/esm/server/web/globals.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$adapter$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/esm/server/web/adapter.js [middleware] (ecmascript)");
// Import the userland code.
var __TURBOPACK__imported__module__$5b$project$5d2f$middleware$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/middleware.ts [middleware] (ecmascript)");
;
;
;
;
const mod = {
    ...__TURBOPACK__imported__module__$5b$project$5d2f$middleware$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__
};
const handler = mod.middleware || mod.default;
const page = "/middleware";
if (typeof handler !== 'function') {
    throw new Error(`The Middleware "${page}" must export a \`middleware\` or a \`default\` function`);
}
// Middleware will only sent out the FetchEvent to next server,
// so load instrumentation module here and track the error inside middleware module.
function errorHandledHandler(fn) {
    return async (...args)=>{
        try {
            return await fn(...args);
        } catch (err) {
            const req = args[0];
            const url = new URL(req.url);
            const resource = url.pathname + url.search;
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$globals$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["edgeInstrumentationOnRequestError"])(err, {
                path: resource,
                method: req.method,
                headers: Object.fromEntries(req.headers.entries())
            }, {
                routerKind: 'Pages Router',
                routePath: '/middleware',
                routeType: 'middleware',
                revalidateReason: undefined
            });
            throw err;
        }
    };
}
function nHandler(opts) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$adapter$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["adapter"])({
        ...opts,
        page,
        handler: errorHandledHandler(handler)
    });
} //# sourceMappingURL=middleware.js.map
}}),
"[project]/edge-wrapper.js { MODULE => \"[project]/node_modules/next/dist/esm/build/templates/middleware.js { INNER_MIDDLEWARE_MODULE => \\\"[project]/middleware.ts [middleware] (ecmascript)\\\" } [middleware] (ecmascript)\" } [middleware] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require } = __turbopack_context__;
{
self._ENTRIES ||= {};
self._ENTRIES["middleware_middleware"] = Promise.resolve().then(()=>__turbopack_import__('[project]/node_modules/next/dist/esm/build/templates/middleware.js { INNER_MIDDLEWARE_MODULE => "[project]/middleware.ts [middleware] (ecmascript)" } [middleware] (ecmascript)'));
}}),
}]);

//# sourceMappingURL=_5d004f._.js.map