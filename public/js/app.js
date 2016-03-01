/*jslint browser: true, debug: true*/
/*global define, module, exports*/
(function (root, factory) {
    "use strict";
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.Behance = factory();
    }
}(this, function () {
    "use strict";

    if (!(Function.prototype.hasOwnProperty('bind'))) {
        Function.prototype.bind = function () {
            var fn = this, context = arguments[0], args = Array.prototype.slice.call(arguments, 1);
            return function () {
                return fn.apply(context, args.concat(Array.prototype.slice.call(arguments)));
            };
        };
    }

    var Behance = function (options) {
        if (!this || !(this instanceof Behance)) {
            return new Behance(options);
        }

        if (!options) {
            options = {};
        }

        if (!options.user) {
            throw 'Provide a valid Behance user name';
        }

        this.endpoint = './request.php?user=' + options.user;
        this.body     = document.querySelector('body');
        this.loader   = document.querySelector('.loading'); 

        this.request();
    };

    Behance.prototype = {
        getJSON: function (path, success, fail) {
            var xhttp = new XMLHttpRequest();

            xhttp.open('GET', path, true);
            xhttp.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            xhttp.setRequestHeader('Content-type', 'application/json');
            xhttp.onreadystatechange = function () {
                if (this.readyState === 4) {
                    if ((this.status >= 200 && this.status < 300) || this.status === 304) {
                        var response = JSON.parse(this.responseText);

                        success.call(this, response);
                    } else {
                        fail.call(this, this.status + ' - ' + this.statusText);
                    }
                }
            };
            xhttp.send();
            xhttp = null;
        },
        supportsSvg: function() {
            return document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1");
        },
        createEls: function (name, props, text) {
            var el = document.createElement(name), p;

            for (p in props) {
                if (props.hasOwnProperty(p)) {
                    el[p] = props[p];
                }
            }

            if (text) {
                el.appendChild(document.createTextNode(text));
            }

            return el;
        },
        each: function (els, callback) {
            var i = 0, max = els.length;

            while (i < max) {
                callback(els[i], i);
                i += 1;
            }
        },
        structureHeader: function () {
            var elements = document.createDocumentFragment(), header;

            header = this.createEls('header', { className: 'portfolio-header clearfix', id: 'header' });

            elements.appendChild(header);
            this.body.appendChild(elements);

            return this;
        },
        structureContent: function () {
            var elements = document.createDocumentFragment(),
                content, portfolio, portfolioList;

            content       = this.createEls('div', { className: 'content-area clearfix', id: 'content' });
            portfolio     = this.createEls('div', { className: 'portfolio-area clearfix', id: 'portfolio' });
            portfolioList = this.createEls('ul', { className: 'portfolio-list clearfix' });

            portfolio.appendChild(portfolioList);
            content.appendChild(portfolio);

            elements.appendChild(content);
            this.body.appendChild(elements);

            return this;
        },
        structureFooter: function () {
            var elements = document.createDocumentFragment(),
                footer, power, powered, p, a;

            footer  = this.createEls('footer', { className: 'portfolio-footer clearfix', id: 'footer' });
            power   = this.createEls('div', { className: 'power-by', id: 'power' });
            powered = this.createEls('p', {}, 'Powered by');
            a       = this.createEls('a', { className: 'power-logo fi-social-behance', href: 'http://www.behance.net/', title: 'Behance' }, 'Behance');
            p       = this.createEls('p');

            p.appendChild(a);
            power.appendChild(powered);
            power.appendChild(p);
            footer.appendChild(power);

            elements.appendChild(footer);
            this.body.appendChild(elements);

            return this;
        },
        mountProfile: function (data) {
            var header   = document.querySelector('#header'),
                fields   = data.user.fields,
                elements = document.createDocumentFragment(),
                fieldName, figure, img, h1, ul, li, div, divF;

            figure = this.createEls('figure', { className: 'profile-avatar'});
            img    = this.createEls('img', { src: data.user.images[138] });
            h1     = this.createEls('h1', { className: 'profile-name' }, data.user.display_name);
            ul     = this.createEls('ul', { className: 'field-list' });
            divF   = this.createEls('div', { className: 'profile-fields' });
            div    = this.createEls('div', { className: 'profile-location fi-marker' }, data.user.location);

            this.each(fields, function (field) {
                li = this.createEls('li', { className: 'field-item' }, field);

                ul.appendChild(li.cloneNode(true));
            }.bind(this));

            figure.appendChild(img);
            divF.appendChild(ul);

            elements.appendChild(figure);
            elements.appendChild(h1);
            elements.appendChild(divF);
            elements.appendChild(div);
            header.appendChild(elements);

            return this;
        },
        mountProjects: function (data) {
            var elements = document.createDocumentFragment(),
                fields, portfolio, h2, ul, li, liF, a, div, divF, figure, img, i, len;

            this.each(data.projects, function (project) {
                fields       = project.fields;
                portfolio    = document.querySelector('.portfolio-list');

                ul     = this.createEls('ul', { className: 'field-list' });
                li     = this.createEls('li', { className: 'portfolio-item' });
                div    = this.createEls('div', { className: 'portfolio-content' });
                divF   = this.createEls('div', { className: 'portfolio-fields' });
                figure = this.createEls('figure', { className: 'portfolio-cover', title: project.name });
                a      = this.createEls('a', { href: project.url });
                img    = this.createEls('img', { className: 'portfolio-image', src: project.covers[404] });
                h2     = this.createEls('h2', { className: 'portfolio-title' }, project.name);

                for (i = 0, len = fields.length; i < len; i += 1) {
                    liF = this.createEls('li', { className: 'field-item' }, fields[i]);

                    ul.appendChild(liF.cloneNode(true));
                }

                a.appendChild(img);
                figure.appendChild(a);
                div.appendChild(figure);
                div.appendChild(h2);
                divF.appendChild(ul);
                div.appendChild(divF);
                li.appendChild(div);

                elements.appendChild(li);
                portfolio.appendChild(elements);
            }.bind(this));

            return this;
        },
        attach: function (data) {
            var status = data && data.http_code;

            if (status === 200) {
                this.body.removeChild(this.loader);
                this.structureHeader().structureContent().structureFooter();
                this.mountProfile(data).mountProjects(data);
            } else {
                this.fail();
            }
        },
        fail: function () {
            var elements = document.createDocumentFragment(),
                p        = this.createEls('p', { className: 'error' }, 'An error ocurred, try again later.');

            elements.appendChild(p);

            this.body.removeChild(this.loader);
            this.body.appendChild(elements);
        },
        request: function () {
            if (!this.supportsSvg()) {
                this.loader.src = './public/css/img/loading.gif';
            }

            this.getJSON(this.endpoint, this.attach.bind(this), this.fail.bind(this));
        }
    };

    return Behance;
}));