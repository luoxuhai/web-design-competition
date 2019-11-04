import querystring from 'querystring';
import url from 'url';

export const queryParse = _url => querystring.parse(url.parse(_url).query);