/*
 * MIT License
 *
 * Copyright (c) 2018 Eric Nguyen
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

/**
 * Generate a random number from `0` to `max`.
 * @param {number} max 
 */
const rand = (max = 1) => Math.random() * max;

/**
 * Basic 2D Vector
 * @param {number} x 
 * @param {number} y 
 */
function Vector2(x, y) {
  this.x = x;
  this.y = y;
  this.add = (other) => new Vector2(this.x + other.x, this.y + other.y);
  this.multiply = (n) => new Vector2(this.x * n, this.y * n);
  this.equals = (other) => this.x === other.x && this.y === other.y;
  this.toString = () => "<" + this.x + ", " + this.y + ">";
}

/**
 * Basic 2D Object
 * @param {Vector2} position 
 * @param {Vector2} velocity 
 * @param {Vector2} scale 
 */
function Object2(position, velocity, scale, color = "white") {
  this.position = position;
  this.velocity = velocity;
  this.scale = scale;
  this.color = color;

  /**
   * Add the object's velocity to its position.
   */
  this.move = function () {
    this.position = this.position.add(this.velocity);
  }
  
  /**
   * Draw a square at this object's position
   * with respect to its scale.
   * @param {CanvasRenderingContext2D} ctx
   */
  this.drawSquare = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.moveTo(this.position.x - this.scale.x, this.position.y - this.scale.y);
    ctx.lineTo(this.position.x + this.scale.x, this.position.y - this.scale.y);
    ctx.lineTo(this.position.x + this.scale.x, this.position.y + this.scale.y);
    ctx.lineTo(this.position.x - this.scale.x, this.position.y + this.scale.y);
    ctx.closePath();
    ctx.fill();
  }

  /**
   * Draw a circle at this object's position 
   * using the object's `scale.x` as the radius.
   * @param {CanvasRenderingContext2D} ctx
   */
  this.drawCircle = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.scale.x, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
  }
  
  /**
   * Draw an image at this object's position without concerning the object's scale.
   * @param {CanvasRenderingContext2D} ctx
   * @param {string} imgPath
   */
  this.drawImage = function (ctx, imgPath) {
    let img = new Image();
    img.src = imgPath;
    ctx.drawImage(img, this.position.x - img.width / 2, this.position.y - img.height / 2);
  }
}

/**
 * Draw the background of a canvas.
 * @param {HTMLCanvasElement} canvas 
 * @param {string} backgroundColor 
 */
function drawBackground(canvas, backgroundColor = "black") {
  canvas.getContext("2d").fillStyle = backgroundColor;
  canvas.getContext("2d").fillRect(0, 0, canvas.width, canvas.height);
}

/**
 * Create a canvas of a specified width, height, and color.
 * @param {number} width 
 * @param {number} height 
 * @param {string} backgroundColor 
 */
function createCanvas (width, height, backgroundColor = "black") {
  const newCanvas = document.createElement("canvas");
  newCanvas.width = width;
  newCanvas.height = height;
  return newCanvas;
}

const winterTheme = {
  /**
   * Draw a snowflake in a context.
   * @param {CanvasRenderingContext2D} ctx 
   * @param {Object2} snowflake 
   * @param {string} color 
   */
  "drawSnowflake": function (ctx, snowflake, color = "white") {
    ctx.shadowBlur = 5;
    ctx.shadowColor = color;
    snowflake.drawCircle(ctx);
  },
  
  /**
   * Create a snowflake with random values, with its position restricted by the given canvas' dimensions.
   * 
   * The random values are as follows:
   * - `position`: <`0` to `canvas.width`, `0` to `canvas.height`>
   * - `velocity`: <`-1` to `1`, `1` to `6`>
   * - `size`: `1` to `6`
   * @param {HTMLCanvasElement} canvas 
   */
  "createRandomSnowflake": function (canvas, 
    position = new Vector2(rand(canvas.width), rand(canvas.height))
  ) {
    let snowflakePosition = position;
    let snowflakeVelocity = new Vector2(rand(2) - 1, rand(2) + 2);
    let randSize = rand(5) + 1;
    let snowflakeSize = new Vector2(randSize, randSize);
    let snowflake = new Object2(snowflakePosition, snowflakeVelocity, snowflakeSize);
    return snowflake;
  },

  /**
   * Create an array of randomized snowflake objects.
   * @param {HTMLCanvasElement} canvas 
   * @param {number} numSnowflakes 
   */
  "createSnowflakes": function (canvas, numSnowflakes) {
    let snowflakes = [];
    for (let i = 0; i < numSnowflakes; i++) {
      snowflakes.push(this.createRandomSnowflake(canvas));
    }
    return snowflakes;
  },
  
  /**
   * If the snowflake is out of bounds of the canvas,
   * then wrap the snowflake around the canvas.
   * @param {HTMLCanvasElement} canvas 
   * @param {Object2} snowflake 
   */
  "wrapSnowflake": function (canvas, snowflake) {
    const wrap = (x, y) => {
      snowflake.position = new Vector2(x, y);
    };
    if (snowflake.position.y > canvas.height) {
      wrap(rand(canvas.width), -snowflake.scale.y);
    } else if (snowflake.position.y < -snowflake.scale.y) {
      wrap(rand(canvas.width), canvas.height);
    } else if (snowflake.position.x < -snowflake.scale.x) {
      wrap(canvas.width, rand(canvas.height));
    } else if (snowflake.position.x > canvas.width + snowflake.scale.x) {
      wrap(-snowflake.scale.x, rand(canvas.height));
    }
  },

  /**
   * The main loop for animating the snowflakes.
   * @param {HTMLCanvasElement} canvas 
   * @param {Object2[]} snowflakes 
   */
  "update": function (canvas, snowflakes) {
    canvas.width = document.documentElement.clientWidth - 17
    canvas.height = document.documentElement.clientHeight - 4;
    const ctx = canvas.getContext("2d");

    // Start the loop
    window.requestAnimationFrame(() => this.update(canvas, snowflakes));

    // Clear the canvas to prevent snowflakes making trails
    // drawBackground(canvas, backgroundColor = "skyblue");

    for (let i = 0; i < snowflakes.length; i++) {
      // Draw the snowflake
      this.drawSnowflake(ctx, snowflakes[i]);

      // Wrap the snowflake around the canvas if it goes out of bounds
      this.wrapSnowflake(canvas, snowflakes[i]);

      // Change snowflake direction based on user input
      snowflakes[i].velocity = snowflakes[i].velocity.add(new Vector2((GetAxis("Horizontal") * snowflakes[i].scale.x) / 500, 0));

      // Move the snowflake
      snowflakes[i].move();
    }
  },

  /**
   * The main function.
   * 
   * Usage:
   * ``` html
   * <body>
   *  <script src="wintertheme.js"></script>
   *  <script>
   *    winterTheme.main();
   *  </script>
   * </body>
   * ```
   */
  "main": function () {
    // Create the canvas to draw on
    const canvas = createCanvas(document.documentElement.clientWidth - 17, document.documentElement.clientHeight - 4, backgroundColor = "skyblue");
    canvas.id = "snowCanvas";

    // Add the canvas to the website
    document.body.insertBefore(canvas, document.body.firstChild);
    document.getElementById("Home").appendChild(canvas);

    // Create the snowflakes
    let snowflakes = this.createSnowflakes(canvas, 20);

    // Update the snowflakes
    this.update(canvas, snowflakes);
  },
}