const markdownIt = require('markdown-it');

const codePen = (
  content,
  url,
  tabs = 'html,result',
  theme = 'default',
  height = '100%'
) => {
  // split and name all the parts of the url from codepen
  const [protocol, , domain, user, pen, hash] = url.split('/');
  const contentHtml = markdownIt().render(content);

  const markup = `<div class="codepen"
	data-height="${height}"
	data-theme-id="${theme}"
	data-default-tab="${tabs}"
	data-slug-hash="${hash}"
	data-user="${user}"
	style="box-sizing: border-box; display: flex; flex-direction: column; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
			<p><a href="${url}">the Pen</a></p>
			<a href="${url}"><img style="max-width: 100%;box-shadow: 1px 1px 5px #999;" src="${url}/image/large.png" /></a>
			${contentHtml}
	</div>`;
  return markup;
};

module.exports = codePen;
