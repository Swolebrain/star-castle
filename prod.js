(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Entity = function () {
  function Entity() {
    _classCallCheck(this, Entity);
  }

  _createClass(Entity, [{
    key: "update",
    value: function update() {}
  }, {
    key: "render",
    value: function render(ctx) {}
  }]);

  return Entity;
}();

exports.default = Entity;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Entity2 = require("./Entity");

var _Entity3 = _interopRequireDefault(_Entity2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Projectile = function (_Entity) {
  _inherits(Projectile, _Entity);

  //direction is an angle. speed is in pixels per second.
  function Projectile(x, y, direction, speed) {
    _classCallCheck(this, Projectile);

    var _this = _possibleConstructorReturn(this, (Projectile.__proto__ || Object.getPrototypeOf(Projectile)).call(this));

    _this.x = x;
    _this.y = y;
    _this.direction = direction;
    _this.speed = speed;
    _this.destroyed = false;
    _this.radius = 2.5;
    return _this;
  }

  _createClass(Projectile, [{
    key: "update",
    value: function update(dt, shields) {
      var _this2 = this;

      if (this.destroyed) return;
      var dx = Math.cos(this.direction) * this.speed;
      var dy = Math.sin(this.direction) * this.speed;
      var newX = this.x + dx;
      var newY = this.y + dy;
      shields.forEach(function (shield) {
        _this2.detectCollisionWithShield(shield, newX, newY);
      });

      this.x = newX;
      this.y = newY;
    }
  }, {
    key: "render",
    value: function render(ctx) {
      if (this.destroyed) return console.log("possible memory leak");
      ctx.strokeRect(this.x - 2, this.y - 2, this.radius * 2, this.radius * 2);
    }
  }, {
    key: "getDistanceToCenter",
    value: function getDistanceToCenter(x, y) {
      var dx = (x || this.x) - window.innerWidth / 2;
      var dy = (y || this.y) - window.innerHeight / 2;
      return Math.sqrt(dx * dx + dy * dy);
    }
  }, {
    key: "detectCollisionWithShield",
    value: function detectCollisionWithShield(shield, newX, newY) {
      if (this.destroyed) return;
      if (this.isInCollisionRangeWith(shield, newX, newY)) {
        var collision = shield.checkAndProcessCollision(this);
        if (collision) this.destroyed = true;
      }
    }
  }, {
    key: "isInCollisionRangeWith",
    value: function isInCollisionRangeWith(shieldSection, newX, newY) {
      return shieldSection.radius > this.getDistanceToCenter(newX, newY) - this.radius && shieldSection.radius < this.getDistanceToCenter() + this.radius;
    }
  }, {
    key: "getPolarAngle",
    value: function getPolarAngle() {
      var x = this.x - window.innerWidth / 2,
          y = window.innerHeight / 2 - this.y;
      var angle = Math.atan2(y, x);
      return (Math.PI - angle + Math.PI) % (2 * Math.PI);
    }
  }]);

  return Projectile;
}(_Entity3.default);

exports.default = Projectile;

},{"./Entity":1}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ShieldSection = require('./ShieldSection');

var _ShieldSection2 = _interopRequireDefault(_ShieldSection);

var _Entity2 = require('./Entity');

var _Entity3 = _interopRequireDefault(_Entity2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var numSections = 0;

var Shield = function (_Entity) {
  _inherits(Shield, _Entity);

  //speed is in degrees per second
  function Shield(radius, speed) {
    _classCallCheck(this, Shield);

    var _this = _possibleConstructorReturn(this, (Shield.__proto__ || Object.getPrototypeOf(Shield)).call(this));

    _this.radius = radius;
    console.log(_this.radius);
    _this.shieldSections = [new _ShieldSection2.default(0, Math.PI * 2, radius)];
    numSections++;
    _this.rotationOffset = 0;
    _this.rotationSpeed = speed * Math.PI / 180;
    _this.destructionRadians = 200 / radius * Math.PI / 4;
    //setInterval(()=>console.log(this.shieldSections),2000);
    return _this;
  }

  _createClass(Shield, [{
    key: 'update',
    value: function update(dt, projectiles) {
      this.rotationOffset += this.rotationSpeed * dt;
      if (this.rotationOffset > Math.PI * 2) this.rotationOffset = 0;
      if (this.shieldSections.length == 0) {
        this.shieldSections.push(new _ShieldSection2.default(0, Math.PI * 2, this.radius * 1.2));
        this.radius = this.radius * 1.2;
      }
    }
  }, {
    key: 'render',
    value: function render(ctx) {
      var _this2 = this;

      // console.log(this.rotationOffset);
      this.shieldSections.forEach(function (section) {
        return section.render(ctx, _this2.rotationOffset);
      });
      ctx.save();
      ctx.translate(window.innerWidth / 2, window.innerHeight / 2);
      ctx.rotate(this.rotationOffset);
      ctx.fillRect(-1, -10, 2, 20);
      ctx.fillStyle = "red";
      ctx.fillRect(-1, -10, 2, 2);
      ctx.restore();
    }
  }, {
    key: 'sections',
    value: function sections() {
      return this.shieldSections;
    }
  }, {
    key: 'checkAndProcessCollision',
    value: function checkAndProcessCollision(projectile) {
      var projectilePolarAngle = projectile.getPolarAngle();
      var projectileCanvasAngle = projectilePolarAngle;
      // let projectileCanvasAngle = -projectilePolarAngle;
      // if (projectilePolarAngle > 0){
      //   projectileCanvasAngle = Math.PI + (Math.PI - projectilePolarAngle);
      // }
      var collidedWithASection = false;
      for (var ssNum = 0; ssNum < this.shieldSections.length; ssNum++) {
        var ss = this.shieldSections[ssNum];
        var ctr = 0;
        while (ctr < 2) {
          if (projectileCanvasAngle + ctr * Math.PI * 2 > this.rotationOffset + ss.startAngle && projectileCanvasAngle + ctr * Math.PI * 2 < this.rotationOffset + ss.startAngle + ss.arcRadians) {
            collidedWithASection = true;
            console.log("hit shield section number " + ssNum);
            this.processCollision(ssNum, projectileCanvasAngle - this.rotationOffset);
            break;
          } else {
            // console.log(`Failed angle test, projectile angle ${projectileCanvasAngle} not between
            //   ${this.rotationOffset + ss.startAngle} and ${this.rotationOffset + ss.startAngle + ss.arcRadians}`);
          }
          if (collidedWithASection) break;

          ctr++;
        }
      }
      return collidedWithASection;
    }
  }, {
    key: 'processCollision',
    value: function processCollision(ssNum, prjAngle) {
      var ss = this.shieldSections[ssNum];
      if (this.destructionRadians > .95 * ss.arcRadians) {
        this.shieldSections.splice(ssNum, 1);
        return;
      }
      if (prjAngle < ss.startAngle + this.destructionRadians / 2) {
        //ss.startAngle += this.destructionRadians;
        //ss.startAngle = ss.startAngle % (Math.PI*2)
        ss.arcRadians -= this.destructionRadians;
        console.log("breaking shield from the start");
      } else if (prjAngle > ss.startAngle + ss.arcRadians - this.destructionRadians / 2) {
        ss.arcRadians -= this.destructionRadians;
        console.log("breaking shield at end");
      } else {
        console.log("breaking shield in half");
        var newSectionEndAngle = ss.startAngle + ss.arcRadians;
        var newSectionStartAngle = prjAngle + this.destructionRadians / 2;
        var newSectionArcRadius = newSectionEndAngle - newSectionStartAngle;
        if (newSectionStartAngle > 2 * Math.PI) newSectionStartAngle %= 2 * Math.PI;
        var newSection = new _ShieldSection2.default(newSectionStartAngle, newSectionArcRadius, this.radius); //+ (numSections++)*5
        if (newSection.arcRadians > 0) this.shieldSections.push(newSection);

        var oldSectionEndAngle = prjAngle - this.destructionRadians / 2;
        ss.arcRadians = oldSectionEndAngle - ss.startAngle;
        // let oldSectionStart = oldSectionEndAngle - ss.arcRadians;
        // ss.startAngle = oldSectionStart;
        if (ss.arcRadians < 0.1) {
          this.shieldSections.splice(ssNum, 1);
        }
      }
      console.log(this.shieldSections);
    }
  }]);

  return Shield;
}(_Entity3.default);

exports.default = Shield;

},{"./Entity":1,"./ShieldSection":4}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Entity2 = require("./Entity");

var _Entity3 = _interopRequireDefault(_Entity2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ShieldSection = function (_Entity) {
  _inherits(ShieldSection, _Entity);

  function ShieldSection(startAngle, arcRadians, radius) {
    _classCallCheck(this, ShieldSection);

    var _this = _possibleConstructorReturn(this, (ShieldSection.__proto__ || Object.getPrototypeOf(ShieldSection)).call(this));

    if (startAngle > 2 * Math.PI) {
      console.log("#########################alert: creating too big of a start angle");
    }
    _this.startAngle = startAngle % (2 * Math.PI);
    _this.arcRadians = arcRadians;
    _this.centerX = window.innerWidth / 2;
    _this.centerY = window.innerHeight / 2;
    _this.radius = radius;
    return _this;
  }

  _createClass(ShieldSection, [{
    key: "render",
    value: function render(ctx, offset) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(this.centerX, this.centerY, this.radius, this.startAngle + offset, this.startAngle + this.arcRadians + offset);

      ctx.stroke();
      ctx.closePath();
      // ctx.beginPath();
      // ctx.strokeStyle = "red";
      //
      // ctx.arc(this.centerX, this.centerY,
      //     this.radius,
      //     this.startAngle+offset, this.startAngle+offset+Math.PI*0.05);
      // ctx.stroke();
      // ctx.closePath()
      // ctx.beginPath();
      // ctx.lineWidth = 4;
      // ctx.arc(this.centerX, this.centerY,
      //     this.radius,
      //     this.startAngle+offset, this.startAngle+offset+Math.PI*0.01);
      // ctx.stroke();
      // ctx.closePath();
      ctx.restore();
    }
  }]);

  return ShieldSection;
}(_Entity3.default);

exports.default = ShieldSection;

},{"./Entity":1}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Projectile = exports.Entity = exports.ShieldSection = exports.Shield = undefined;

var _Shield = require('./Shield');

var _Shield2 = _interopRequireDefault(_Shield);

var _ShieldSection = require('./ShieldSection');

var _ShieldSection2 = _interopRequireDefault(_ShieldSection);

var _Entity = require('./Entity');

var _Entity2 = _interopRequireDefault(_Entity);

var _Projectile = require('./Projectile');

var _Projectile2 = _interopRequireDefault(_Projectile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Shield = _Shield2.default;
exports.ShieldSection = _ShieldSection2.default;
exports.Entity = _Entity2.default;
exports.Projectile = _Projectile2.default;

},{"./Entity":1,"./Projectile":2,"./Shield":3,"./ShieldSection":4}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  return new Promise(function (resolve, reject) {
    var imageUrls = ['assets/img/ship_sm.png', 'assets/img/flame_sm.png', 'assets/img/cannon-sm.png'];
    var numLoaded = 0;
    var imgLoadHandler = function imgLoadHandler() {
      numLoaded++;
      if (numLoaded === imageUrls.length) {
        resolve(images);
      }
    };
    var images = {};
    imageUrls.forEach(function (uri, idx) {
      var img = new Image();
      img.src = imageUrls[idx];
      img.onload = imgLoadHandler;
      images[uri] = img;
    });
  });
};

},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Entities = require('../Entities');

var _TouchControls = require('../ui/TouchControls');

var _TouchControls2 = _interopRequireDefault(_TouchControls);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Ship = function (_Entity) {
  _inherits(Ship, _Entity);

  function Ship(images, speed, x, y) {
    _classCallCheck(this, Ship);

    var _this = _possibleConstructorReturn(this, (Ship.__proto__ || Object.getPrototypeOf(Ship)).call(this));

    _this.fireProjectile = function () {
      _this.projectiles.push(new _Entities.Projectile(_this.x, _this.y, _this.controls.getAngle(), 20));
    };

    _this.checkInsideShields = function (shields) {
      var radius = _this.spriteScale * _this.sprite.width / 2;
      var polarAngle = _this.getPolarAngle();
      var thisDistanceToCenter = Math.round(_this.getDistanceToCenter());
      // console.log(polarAngle);
      var ret = null;
      shields.forEach(function (shield, i) {
        if (ret) return;
        shield.shieldSections.forEach(function (shieldSection, i2) {
          // console.log(shieldSection.startAngle);
          var shieldAngle = shieldSection.startAngle + shield.rotationOffset;
          var startAngle = shieldAngle % (Math.PI * 2);
          var endAngle = startAngle + shieldSection.arcRadians;
          var endAngle2 = endAngle % (2 * Math.PI);
          var opening = 2 * Math.PI - shieldSection.arcRadians;
          // let openingStart = startAngle - opening > 0 ? startAngle - opening : 2*Math.PI+opening;
          // if (Math.random()<0.1)
          // console.log(Math.round(startAngle*100)/100,
          //     Math.round(endAngle *100)/100, Math.round(endAngle2 *100)/100, Math.round(opening*100)/100 );

          if (thisDistanceToCenter - radius > shieldSection.radius) {
            return;
          }
          var shipArcSize = _this.sprite.width * _this.spriteScale / shieldSection.radius;

          if (opening <= shipArcSize || startAngle < endAngle2 && polarAngle > startAngle && polarAngle < endAngle2 || endAngle2 < startAngle && (polarAngle < endAngle2 || polarAngle > startAngle)) {
            // console.log('Collided with shield', i, "section", i2);
            ret = { x: Math.cos(polarAngle) * 10,
              y: Math.sin(polarAngle) * 10
            };
            return;
          }
        });
      });
      return ret;
    };

    _this.sprite = images['assets/img/ship_sm.png'];
    _this.propulsionSprite = images['assets/img/flame_sm.png'];
    _this.spriteScale = 0.5;
    _this.speed = speed;
    _this.bounceSpeed = { x: 0, y: 0 };
    var _window = window,
        w = _window.innerWidth,
        h = _window.innerHeight;

    _this.x = x || (Math.random() * w * 0.2 - w * 0.1 + w) % w;
    _this.y = y || (Math.random() * h * 0.2 - h * 0.1 + h) % h;
    console.log('Spawning ship at ' + _this.x + ', ' + _this.y);
    _this.controls = new _TouchControls2.default(_this.fireProjectile);
    _this.projectiles = [];
    return _this;
  }

  _createClass(Ship, [{
    key: 'update',
    value: function update(dt, shields) {
      this.projectiles.forEach(function (projectile) {
        return projectile.update(dt, shields);
      });
      this.projectiles = this.projectiles.filter(function (projectile) {
        return !projectile.destroyed;
      });
      this.x += Math.cos(this.controls.getAngle()) * this.speed * dt;
      this.y += Math.sin(this.controls.getAngle()) * this.speed * dt;
      var bounce = this.checkInsideShields(shields);
      if (bounce) {
        console.log(bounce);
        this.bounceSpeed = bounce;
      }
      this.processBounceSpeed();
      if (this.x > window.innerWidth) {
        this.x = 0;
      } else if (this.x < 0) {
        this.x = window.innerWidth;
      }
      if (this.y > window.innerHeight) this.y = 0;else if (this.y < 0) this.y = window.innerHeight;
    }
  }, {
    key: 'render',
    value: function render(ctx) {
      this.projectiles.forEach(function (projectile) {
        return projectile.render(ctx);
      });
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.controls.getAngle());
      ctx.drawImage(this.propulsionSprite, -(this.sprite.width / 2 + this.propulsionSprite.width / 1.15) * this.spriteScale, -this.propulsionSprite.height * this.spriteScale / 2, this.propulsionSprite.width * this.spriteScale, this.propulsionSprite.height * this.spriteScale);
      ctx.drawImage(this.sprite, -this.sprite.width * this.spriteScale / 2, -this.sprite.height * this.spriteScale / 2, this.sprite.width * this.spriteScale, this.sprite.height * this.spriteScale);
      ctx.fillStyle = "#0000FF";
      ctx.fillRect(-1, -1, 3, 3);
      ctx.restore();
      if (this.controls.render) this.controls.render(ctx);
    }
  }, {
    key: 'processBounceSpeed',
    value: function processBounceSpeed() {
      this.x += this.bounceSpeed.x;
      this.y += this.bounceSpeed.y;
      this.bounceSpeed.x *= .9;
      this.bounceSpeed.y *= .9;
      if (Math.abs(this.bounceSpeed.x) < 0.01) this.bounceSpeed.x = 0;
      if (Math.abs(this.bounceSpeed.y) < 0.01) this.bounceSpeed.y = 0;
    }
  }, {
    key: 'getDistanceToCenter',
    value: function getDistanceToCenter(x, y) {
      var dx = (x || this.x) - window.innerWidth / 2;
      var dy = (y || this.y) - window.innerHeight / 2;
      return Math.sqrt(dx * dx + dy * dy);
    }
  }, {
    key: 'getPolarAngle',
    value: function getPolarAngle() {
      var x = this.x - window.innerWidth / 2,
          y = window.innerHeight / 2 - this.y;
      var angle = Math.atan2(y, x);
      angle = (Math.PI - angle + Math.PI) % (2 * Math.PI);
      // console.log(angle);
      return angle;
    }
  }]);

  return Ship;
}(_Entities.Entity);

exports.default = Ship;

},{"../Entities":5,"../ui/TouchControls":9}],8:[function(require,module,exports){
'use strict';

var _Entities = require('./Entities');

var _Preloader = require('./Preloader');

var _Preloader2 = _interopRequireDefault(_Preloader);

var _Ship = require('./Ship/Ship.js');

var _Ship2 = _interopRequireDefault(_Ship);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var images;
(0, _Preloader2.default)().then(function (img) {
  images = img;
  game();
});

var radius1 = Math.round(Math.min(window.innerWidth, window.innerHeight) * .2);
var initializeEntities = function initializeEntities() {
  return {
    shields: [new _Entities.Shield(radius1, 12), new _Entities.Shield(radius1 * 0.66, 10), new _Entities.Shield(radius1 * 0.33, 6)],
    projectiles: [],
    player: new _Ship2.default(images, 100)
  };
};

var game = function game() {

  var canvas = document.createElement('canvas');
  document.body.appendChild(canvas);
  var ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  var _initializeEntities = initializeEntities(canvas),
      shields = _initializeEntities.shields,
      projectiles = _initializeEntities.projectiles,
      player = _initializeEntities.player;

  var loopStart = new Date().getTime();
  var loop = function loop() {
    var loopDuration = new Date().getTime() - loopStart;
    loopStart = new Date().getTime();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var dt = loopDuration / 1000;
    //projectiles.forEach(projectile=>projectile.update(dt, shields));
    shields.forEach(function (shield) {
      return shield.update(dt);
    });
    //projectiles = projectiles.filter(projectile=>!projectile.destroyed);
    player.update(dt, shields);

    // projectiles.forEach(projectile=>projectile.render(ctx));
    shields.forEach(function (shield) {
      return shield.render(ctx);
    });
    player.render(ctx);

    window.requestAnimationFrame(loop);
  };
  loop();
};

},{"./Entities":5,"./Preloader":6,"./Ship/Ship.js":7}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TouchControls = function () {
  function TouchControls(action, color) {
    var _this = this;

    _classCallCheck(this, TouchControls);

    this.onTouchStart = function (e) {
      Array.prototype.forEach.call(e.changedTouches, function (touch) {
        //console.log(touch.clientX < window.innerWidth/2);
        if (_this.leftStickTouchID == null && touch.clientX < window.innerWidth / 2) {
          _this.leftStickTouchID = touch.identifier;
          //console.log(this.leftStickTouchID);
          _this.leftStickAnchor = { x: touch.clientX, y: touch.clientY };
          _this.leftStickPosition = { x: touch.clientX, y: touch.clientY };
        } else {
          //console.log("tappy?");
          _this.actionButton();
        }
      });
    };

    this.onTouchMove = function (e) {
      if (_this.leftStickTouchID == null) return;
      Array.prototype.forEach.call(e.changedTouches, function (touch) {
        if (touch.identifier != _this.leftStickTouchID) return;
        _this.leftStickPosition = { x: touch.clientX, y: touch.clientY };
        _this.lastAngle = Math.atan2(_this.leftStickPosition.y - _this.leftStickAnchor.y, _this.leftStickPosition.x - _this.leftStickAnchor.x);
      });
    };

    this.onTouchEnd = function (e) {
      e.preventDefault();
      Array.prototype.forEach.call(e.changedTouches, function (touch) {
        if (touch.identifier == _this.leftStickTouchID) {
          _this.leftStickTouchID = null;
          _this.leftStickAnchor = null;
          _this.leftStickPosition = null;
        }
      });
    };

    //this property is for keeping track of the touch id of the left stick
    this.leftStickTouchID = null;
    this.leftStickAnchor = null;
    this.leftStickPosition = null;
    this.color = color || 'cyan';
    if (!'createTouch' in document) return;
    window.addEventListener('touchstart', this.onTouchStart, false);
    window.addEventListener('touchmove', this.onTouchMove, false);
    window.addEventListener('touchend', this.onTouchEnd, false);
    this.circleDimensions = Math.round(Math.max(window.innerWidth * 0.06, window.innerHeight * 0.06));
    this.lastAngle = 0;
    this.actionButton = action;
  }

  _createClass(TouchControls, [{
    key: 'getAngle',
    value: function getAngle() {
      return this.lastAngle;
    }
  }, {
    key: 'update',
    value: function update() {}
  }, {
    key: 'render',
    value: function render(ctx) {
      if (this.leftStickTouchID == null) return;
      ctx.save();
      ctx.beginPath();
      ctx.strokeStyle = this.color;
      //draw big circle anchor
      ctx.ellipse(this.leftStickAnchor.x, this.leftStickAnchor.y, this.circleDimensions, this.circleDimensions, 0, 0, Math.PI * 2);
      //draw little circle anchor
      ctx.stroke();
      ctx.closePath();
      ctx.beginPath();
      ctx.ellipse(this.leftStickPosition.x, this.leftStickPosition.y, this.circleDimensions * 0.6, this.circleDimensions * 0.6, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.closePath();
      ctx.restore();
    }
  }]);

  return TouchControls;
}();

exports.default = TouchControls;

},{}]},{},[8]);
