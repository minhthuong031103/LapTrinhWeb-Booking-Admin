"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/attr-accept";
exports.ids = ["vendor-chunks/attr-accept"];
exports.modules = {

/***/ "(ssr)/./node_modules/attr-accept/dist/es/index.js":
/*!***************************************************!*\
  !*** ./node_modules/attr-accept/dist/es/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nexports.__esModule = true;\nexports[\"default\"] = function(file, acceptedFiles) {\n    if (file && acceptedFiles) {\n        var acceptedFilesArray = Array.isArray(acceptedFiles) ? acceptedFiles : acceptedFiles.split(\",\");\n        var fileName = file.name || \"\";\n        var mimeType = (file.type || \"\").toLowerCase();\n        var baseMimeType = mimeType.replace(/\\/.*$/, \"\");\n        return acceptedFilesArray.some(function(type) {\n            var validType = type.trim().toLowerCase();\n            if (validType.charAt(0) === \".\") {\n                return fileName.toLowerCase().endsWith(validType);\n            } else if (validType.endsWith(\"/*\")) {\n                // This is something like a image/* mime type\n                return baseMimeType === validType.replace(/\\/.*$/, \"\");\n            }\n            return mimeType === validType;\n        });\n    }\n    return true;\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvYXR0ci1hY2NlcHQvZGlzdC9lcy9pbmRleC5qcyIsIm1hcHBpbmdzIjoiQUFBYTtBQUViQSxrQkFBa0IsR0FBRztBQUVyQkEsa0JBQWUsR0FBRyxTQUFVRyxJQUFJLEVBQUVDLGFBQWE7SUFDN0MsSUFBSUQsUUFBUUMsZUFBZTtRQUN6QixJQUFJQyxxQkFBcUJDLE1BQU1DLE9BQU8sQ0FBQ0gsaUJBQWlCQSxnQkFBZ0JBLGNBQWNJLEtBQUssQ0FBQztRQUM1RixJQUFJQyxXQUFXTixLQUFLTyxJQUFJLElBQUk7UUFDNUIsSUFBSUMsV0FBVyxDQUFDUixLQUFLUyxJQUFJLElBQUksRUFBQyxFQUFHQyxXQUFXO1FBQzVDLElBQUlDLGVBQWVILFNBQVNJLE9BQU8sQ0FBQyxTQUFTO1FBQzdDLE9BQU9WLG1CQUFtQlcsSUFBSSxDQUFDLFNBQVVKLElBQUk7WUFDM0MsSUFBSUssWUFBWUwsS0FBS00sSUFBSSxHQUFHTCxXQUFXO1lBRXZDLElBQUlJLFVBQVVFLE1BQU0sQ0FBQyxPQUFPLEtBQUs7Z0JBQy9CLE9BQU9WLFNBQVNJLFdBQVcsR0FBR08sUUFBUSxDQUFDSDtZQUN6QyxPQUFPLElBQUlBLFVBQVVHLFFBQVEsQ0FBQyxPQUFPO2dCQUNuQyw2Q0FBNkM7Z0JBQzdDLE9BQU9OLGlCQUFpQkcsVUFBVUYsT0FBTyxDQUFDLFNBQVM7WUFDckQ7WUFFQSxPQUFPSixhQUFhTTtRQUN0QjtJQUNGO0lBRUEsT0FBTztBQUNUIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbmV4dGpzLWVjb21tZXJjZS11aXQvLi9ub2RlX21vZHVsZXMvYXR0ci1hY2NlcHQvZGlzdC9lcy9pbmRleC5qcz83MTY0Il0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoZmlsZSwgYWNjZXB0ZWRGaWxlcykge1xuICBpZiAoZmlsZSAmJiBhY2NlcHRlZEZpbGVzKSB7XG4gICAgdmFyIGFjY2VwdGVkRmlsZXNBcnJheSA9IEFycmF5LmlzQXJyYXkoYWNjZXB0ZWRGaWxlcykgPyBhY2NlcHRlZEZpbGVzIDogYWNjZXB0ZWRGaWxlcy5zcGxpdCgnLCcpO1xuICAgIHZhciBmaWxlTmFtZSA9IGZpbGUubmFtZSB8fCAnJztcbiAgICB2YXIgbWltZVR5cGUgPSAoZmlsZS50eXBlIHx8ICcnKS50b0xvd2VyQ2FzZSgpO1xuICAgIHZhciBiYXNlTWltZVR5cGUgPSBtaW1lVHlwZS5yZXBsYWNlKC9cXC8uKiQvLCAnJyk7XG4gICAgcmV0dXJuIGFjY2VwdGVkRmlsZXNBcnJheS5zb21lKGZ1bmN0aW9uICh0eXBlKSB7XG4gICAgICB2YXIgdmFsaWRUeXBlID0gdHlwZS50cmltKCkudG9Mb3dlckNhc2UoKTtcblxuICAgICAgaWYgKHZhbGlkVHlwZS5jaGFyQXQoMCkgPT09ICcuJykge1xuICAgICAgICByZXR1cm4gZmlsZU5hbWUudG9Mb3dlckNhc2UoKS5lbmRzV2l0aCh2YWxpZFR5cGUpO1xuICAgICAgfSBlbHNlIGlmICh2YWxpZFR5cGUuZW5kc1dpdGgoJy8qJykpIHtcbiAgICAgICAgLy8gVGhpcyBpcyBzb21ldGhpbmcgbGlrZSBhIGltYWdlLyogbWltZSB0eXBlXG4gICAgICAgIHJldHVybiBiYXNlTWltZVR5cGUgPT09IHZhbGlkVHlwZS5yZXBsYWNlKC9cXC8uKiQvLCAnJyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBtaW1lVHlwZSA9PT0gdmFsaWRUeXBlO1xuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59OyJdLCJuYW1lcyI6WyJleHBvcnRzIiwiX19lc01vZHVsZSIsImRlZmF1bHQiLCJmaWxlIiwiYWNjZXB0ZWRGaWxlcyIsImFjY2VwdGVkRmlsZXNBcnJheSIsIkFycmF5IiwiaXNBcnJheSIsInNwbGl0IiwiZmlsZU5hbWUiLCJuYW1lIiwibWltZVR5cGUiLCJ0eXBlIiwidG9Mb3dlckNhc2UiLCJiYXNlTWltZVR5cGUiLCJyZXBsYWNlIiwic29tZSIsInZhbGlkVHlwZSIsInRyaW0iLCJjaGFyQXQiLCJlbmRzV2l0aCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/attr-accept/dist/es/index.js\n");

/***/ })

};
;