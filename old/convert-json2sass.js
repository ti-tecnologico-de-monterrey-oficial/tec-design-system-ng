let fs = require('fs');
const json = JSON.parse(
  fs.readFileSync(
    './projects/ds-ng/src/lib/types/foundations/colors/objects/color-group-names.json',
    'utf8',
  ),
);

const getSASSVar = (key, value) =>
  typeof value === 'string' ? `$${key}: "${value}";\n` : '';

const getSASSMap = (jsonObject, _sassFormat) => {
  let _sassMap = '';
  // let _sassVarList = '';

  Object.entries(jsonObject).forEach(([key, value], index, array) => {
    if (typeof value === 'string') {
      _sassMap += `'${key}': ${value},\n${index < array.length - 1 ? '  ' : ''}`;
      // _sassVarList += getSASSVar(key.replaceAll('-', '_'), value);
    }
  });

  // _sassFormat.varList = _sassVarList;

  return _sassMap;
};

const getSASSFormat = (jsonObject) => {
  let _sassVars = '';
  let _sassMaps = '';
  let _sassFormat = { varList: '' };

  Object.entries(jsonObject).forEach(([key, value]) => {
    if (typeof value === 'object') {
      _sassMaps += `$${key}: (\n  ${getSASSMap(value, _sassFormat)});\n`;
      _sassVars += _sassFormat.varList;
    } else {
      _sassVars += getSASSVar(key, value);
    }
  });

  return `${_sassVars}\n${_sassMaps}`;
};

fs.writeFileSync(
  './projects/ds-ng/src/assets/styles/base/_color-group-name.scss',
  getSASSFormat(json),
);
