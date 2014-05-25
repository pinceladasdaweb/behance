/*
--------------------------------
Behance Portfolio Page
--------------------------------
+ https://github.com/pinceladasdaweb/Behance-Portfolio-Page
+ version 1.0.0
+ Copyright 2014 Pedro Rogerio
+ Licensed under the MIT license

+ Documentation: https://github.com/pinceladasdaweb/Behance-Portfolio-Page
*/
var Be = (function (window, document, undefined) {
    "use strict";
    var module = {
        config: function (config) {
            this.url    = './request.php?user=' + config.user;
            this.body   = document.querySelector('body');
            this.loader = document.querySelector('.loading'); 
        },
        supportsSvg: function() {
            return document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1");
        },
        xhr: function () {
            return new window.XMLHttpRequest();
        },
        getJSON: function (options, callback) {
            var xhttp = module.xhr();
            options.url = options.url || location.href;
            options.data = options.data || null;
            xhttp.open('GET', options.url, true);
            xhttp.send(options.data);
            xhttp.onreadystatechange = function () {
                if (xhttp.status === 200 && xhttp.readyState === 4) {
                    callback(JSON.parse(xhttp.responseText));
                }
            };
        },
        create: function (name, props) {
            var el = document.createElement(name), p;
            for (p in props) {
                if (props.hasOwnProperty(p)) {
                    el[p] = props[p];
                }
            }
            return el;
        },
        loop: function (els, callback) {
            var i = 0, max = els.length;

            while (i < max) {
                callback(els[i], i);
                i += 1;
            }
        },
        userProfile: function (data) {
            var self         = this,
                header       = document.querySelector('#header'),
                displayName  = document.createTextNode(data.user.display_name),
                avatar       = data.user.images[138],
                fields       = data.user.fields,
                localization = document.createTextNode(data.user.location),
                elements     = document.createDocumentFragment(),
                fieldName, figure, img, h1, ul, li, div, divF;

            figure = self.create('figure', { className: 'profile-avatar'});
            img    = self.create('img', { src: avatar });
            h1     = self.create('h1', { className: 'profile-name' });
            ul     = self.create('ul', { className: 'field-list' });
            divF   = self.create('div', { className: 'profile-fields' });
            div    = self.create('div', { className: 'profile-location fi-marker' });

            self.loop(fields, function (field) {
                fieldName = document.createTextNode(field);
                li = self.create('li', { className: 'field-item' });

                li.appendChild(fieldName);
                ul.appendChild(li.cloneNode(true));
            });

            figure.appendChild(img);
            h1.appendChild(displayName);
            divF.appendChild(ul);
            div.appendChild(localization);

            elements.appendChild(figure);
            elements.appendChild(h1);
            elements.appendChild(divF);
            elements.appendChild(div);
            header.appendChild(elements);
        },
        userProjects: function (data) {
            var self   = this;

            self.loop(data.projects, function (project) {
                var url          = project.url,
                    cover        = project.covers[404],
                    projectName  = document.createTextNode(project.name),
                    projectTitle = project.name,
                    fields       = project.fields,
                    portfolio    = document.querySelector('.portfolio-list'),
                    elements     = document.createDocumentFragment(),
                    fieldName, h2, ul, li, liF, a, div, divF, figure, img, i, len;

                ul     = self.create('ul', { className: 'field-list' });
                li     = self.create('li', { className: 'portfolio-item' });
                div    = self.create('div', { className: 'portfolio-content' });
                divF   = self.create('div', { className: 'portfolio-fields' });
                figure = self.create('figure', { className: 'portfolio-cover', title: projectTitle });
                a      = self.create('a', { href: url });
                img    = self.create('img', { className: 'portfolio-image', src: cover });
                h2     = self.create('h2', { className: 'portfolio-title' });

                for (i = 0, len = fields.length; i < len; i += 1) {
                    fieldName = document.createTextNode(fields[i]);
                    liF           = self.create('li', { className: 'field-item' });

                    liF.appendChild(fieldName);
                    ul.appendChild(liF.cloneNode(true));
                }

                a.appendChild(img);
                figure.appendChild(a);
                div.appendChild(figure);
                h2.appendChild(projectName);
                div.appendChild(h2);
                divF.appendChild(ul);
                div.appendChild(divF);
                li.appendChild(div);

                elements.appendChild(li);
                portfolio.appendChild(elements.cloneNode(true));
            });
        },
        createHeader: function () {
            var self     = this,
                elements = document.createDocumentFragment(),
                header;

            header = self.create('header', { className: 'portfolio-header clearfix', id: 'header' });

            elements.appendChild(header);
            self.body.appendChild(elements);
        },
        createContent: function () {
            var self     = this,
                elements = document.createDocumentFragment(),
                content, portfolio, portfolioList;

            content       = self.create('div', { className: 'content-area clearfix', id: 'content' });
            portfolio     = self.create('div', { className: 'portfolio-area clearfix', id: 'portfolio' });
            portfolioList = self.create('ul', { className: 'portfolio-list clearfix' });

            portfolio.appendChild(portfolioList);
            content.appendChild(portfolio);

            elements.appendChild(content);
            self.body.appendChild(elements);
        },
        createFooter: function () {
            var self        = this,
                elements    = document.createDocumentFragment(),
                poweredText = document.createTextNode('Powered by'),
                be          = document.createTextNode('Behance'),
                footer, power, powered, p, a;

            footer  = self.create('footer', { className: 'portfolio-footer clearfix', id: 'footer' });
            power   = self.create('div', { className: 'power-by', id: 'power' });
            powered = self.create('p');
            a       = self.create('a', { className: 'power-logo fi-social-behance', href: 'http://www.behance.net/', title: 'Behance' });
            p       = self.create('p');;

            a.appendChild(be);
            p.appendChild(a);
            powered.appendChild(poweredText);
            power.appendChild(powered);
            power.appendChild(p);
            footer.appendChild(power);
            
            elements.appendChild(footer);
            self.body.appendChild(elements);
        },
        loading: function (node) {
            var self = this;
            
            node.removeChild(self.loader);
        },
        handleError: function () {
            var self     = this,
                elements = document.createDocumentFragment(),
                p        = self.create('p', { className: 'error' }),
                text     = document.createTextNode('An error ocurred, try again later.');

            p.appendChild(text);
            elements.appendChild(p);

            self.body.appendChild(elements);

        },
        attach: function (data) {
            var self = this;

            self.createHeader();
            self.createContent();
            self.createFooter();
            self.userProfile(data);
            self.userProjects(data);
        },
        request: function () {
            var self = this,
                body = self.body,
                status;

            if (!self.supportsSvg()) {
                self.loader.src = './assets/css/img/loading.gif';
            }

            self.getJSON({url: self.url}, function (data) {
                status = data.http_code;

                if (status === 200) {
                    self.loading(body);
                    self.attach(data);
                } else {
                    self.loading(body);
                    self.handleError();
                }
            });
        },
        profile: function (config) {
            module.config(config);
            module.request();
        }
    };
    return {
        profile: module.profile
    };
}(window, document));