Magi.TriToneMaterial = Object.clone(Magi.FilterQuadMaterial);
Magi.TriToneMaterial.frag = {type:'FRAGMENT_SHADER', text: (
  "precision highp float;"+
  "uniform sampler2D Texture0;"+
  "varying vec2 texCoord0;"+
  "uniform float lowThreshold;"+
  "uniform float highThreshold;"+
  "uniform vec4 highColor;"+
  "uniform vec4 lowColor;"+
  "uniform vec4 midColor;"+
  "void main()"+
  "{"+
  "  vec4 c = texture2D(Texture0, texCoord0);"+
  "  float g = 0.2126*c.r + 0.7152*c.g + 0.0722*c.b;"+
  "  if (g > highThreshold) {"+
  "    gl_FragColor = highColor;"+
  "  } else if (g < lowThreshold) {"+
  "    gl_FragColor = lowColor;"+
  "  } else {"+
  "    gl_FragColor = midColor;"+
  "  }"+
  "}"
)};
Magi.TriToneMaterial.setupMaterial = function(shader) {
  var m = new Magi.Material(shader);
  m.textures.Texture0 = null;
  m.floats.lowColor = vec4.create(0.0, 0.0, 0.0, 1.0);
  m.floats.midColor = vec4.create(1.0, 0, 0, 1.0);
  m.floats.highColor = vec4.create(1.0, 1.0, 1.0, 1.0);
  m.floats.lowThreshold = 0.33;
  m.floats.highThreshold = 0.66;
  return m;
}


Magi.IdFilterMaterial = Object.clone(Magi.FilterQuadMaterial);
Magi.IdFilterMaterial.frag = {type: 'FRAGMENT_SHADER', text: (
  "precision highp float;"+
  "uniform sampler2D Texture0;"+
  "varying vec2 texCoord0;"+
  "void main()"+
  "{"+
  "  vec4 c = texture2D(Texture0, texCoord0);"+
  "  gl_FragColor = c;"+
  "}"
)};


Magi.RadialGlowMaterial = Object.clone(Magi.FilterQuadMaterial);
Magi.RadialGlowMaterial.frag = {type:'FRAGMENT_SHADER', text: (
  "precision highp float;"+
  "uniform sampler2D Texture0;"+
  "varying vec2 texCoord0;"+
  "uniform vec2 center;"+
  "uniform float radius;"+
  "uniform float currentFactor;"+
  "uniform float intensity;"+
  "uniform float falloff;"+
  "void main()"+
  "{"+
  "  float samples = 8.0;"+
  "  float len = length(center - texCoord0);"+
  "  float rs = len*radius/samples;"+
  "  vec2 dir = rs * normalize(center - texCoord0);"+
  "  vec4 c = currentFactor * texture2D(Texture0, texCoord0);"+
  "  float d = intensity;"+
  "  float count = 0.0;"+
  "  float ran = 1.0 + 0.01*sin(texCoord0.t*123.489);"+
  "  for (float r=1.0; r <= 8.0; r++) {"+
  "    vec2 tc = texCoord0 + (r*dir) * ran;"+
  "    vec4 pc = texture2D(Texture0, tc + rs);"+
  "    c += pc*d;"+
  "    count += d;"+
  "    d *= falloff;"+
  "  }"+
  "  c /= count;"+
  "  c.a = 1.0;"+
  "  gl_FragColor = c;"+
  "}"
)};
Magi.RadialGlowMaterial.setupMaterial = function(shader) {
  var m = new Magi.Material(shader);
  m.textures.Texture0 = null;
  m.floats.center = vec2.create(0.5, -0.2);
  m.floats.radius = 0.04;
  m.floats.intensity = 1.0;
  m.floats.falloff = 0.87;
  m.floats.currentFactor = 0.0;
  return m;
}


Magi.ChromaticAberrationMaterial = Object.clone(Magi.FilterQuadMaterial);
Magi.ChromaticAberrationMaterial.frag = {type:'FRAGMENT_SHADER', text: (
  "precision highp float;"+
  "uniform sampler2D Texture0;"+
  "varying vec2 texCoord0;"+
  "uniform vec2 center;"+
  "uniform float radius;"+
  "void main()"+
  "{"+
  "  vec2 shift = radius * (center - texCoord0);"+
  "  vec4 r = texture2D(Texture0, texCoord0+shift);"+
  "  vec4 g = texture2D(Texture0, texCoord0);"+
  "  vec4 b = texture2D(Texture0, texCoord0-shift);"+
  "  gl_FragColor = vec4(r.r, g.g, b.b, g.a);"+
  "}"
)};
Magi.ChromaticAberrationMaterial.setupMaterial = function(shader) {
  var m = new Magi.Material(shader);
  m.textures.Texture0 = null;
  m.floats.center = vec2.create(0.5, 0.5);
  m.floats.radius = 0.01;
  return m;
}


Magi.GrayscaleMaterial = Object.clone(Magi.FilterQuadMaterial);
Magi.GrayscaleMaterial.frag = {type:'FRAGMENT_SHADER', text: (
  "precision highp float;"+
  "uniform sampler2D Texture0;"+
  "varying vec2 texCoord0;"+
  "void main()"+
  "{"+
  "  vec4 c = texture2D(Texture0, texCoord0);"+
  "  c.r = c.g = c.b = 0.2126*c.r + 0.7152*c.g + 0.0722*c.b;"+
  "  gl_FragColor = c;"+
  "}"
)};
Magi.GrayscaleMaterial.setupMaterial = function(shader) {
  var m = new Magi.Material(shader);
  m.textures.Texture0 = null;
  return m;
}


Magi.ThresholdMaterial = Object.clone(Magi.FilterQuadMaterial);
Magi.ThresholdMaterial.frag = {type:'FRAGMENT_SHADER', text: (
  "precision highp float;"+
  "uniform sampler2D Texture0;"+
  "varying vec2 texCoord0;"+
  "uniform float threshold;"+
  "uniform vec4 highColor;"+
  "uniform vec4 lowColor;"+
  "void main()"+
  "{"+
  "  vec4 c = texture2D(Texture0, texCoord0);"+
  "  if (0.2126*c.r + 0.7152*c.g + 0.0722*c.b > threshold) {"+
  "    gl_FragColor = highColor;"+
  "  } else {"+
  "    gl_FragColor = lowColor;"+
  "  }"+
  "}"
)};
Magi.ThresholdMaterial.setupMaterial = function(shader) {
  var m = new Magi.Material(shader);
  m.textures.Texture0 = null;
  m.floats.lowColor = vec4.create(0.0, 0.0, 0.0, 1.0);
  m.floats.highColor = vec4.create(1.0, 1.0, 1.0, 1.0);
  m.floats.threshold = 0.5;
  return m;
}


Magi.PolarCoordMaterial = Object.clone(Magi.FilterQuadMaterial);
Magi.PolarCoordMaterial.frag = {type:'FRAGMENT_SHADER', text: (
  "precision highp float;"+
  "uniform sampler2D Texture0;"+
  "varying vec2 texCoord0;"+
  "uniform vec2 PixelSize;"+
  "void main()"+
  "{"+
  "  vec2 d = texCoord0 - vec2(0.5, 0.5);"+
  "  float angle = (1.0+atan(d.s, d.t)/3.14159);"+
  "  vec2 tc = vec2(2.0*length(d), abs(mod(3.0*angle, 2.0)-1.0));"+
  "  gl_FragColor = texture2D(Texture0, tc);"+
  "}"
)};
Magi.ThresholdMaterial.setupMaterial = function(shader) {
  var m = new Magi.Material(shader);
  m.textures.Texture0 = null;
  m.floats.PixelSize = vec2.create(1.0, 1.0);
  return m;
}


Magi.Convolution3x3Material = Object.clone(Magi.FilterQuadMaterial);
Magi.Convolution3x3Material.frag = {type:'FRAGMENT_SHADER', text: (
  "precision highp float;"+
  "uniform sampler2D Texture0;"+
  "varying vec2 texCoord0;"+
  "uniform vec2 PixelSize;"+
  "uniform mat3 Kernel;"+
  "void main()"+
  "{"+
  "  vec4 c = vec4(0.0);"+
  "  c += Kernel[0][0] * texture2D(Texture0, texCoord0+vec2(-PixelSize.x, -PixelSize.y));"+
  "  c += Kernel[0][1] * texture2D(Texture0, texCoord0+vec2(-PixelSize.x,  0.0));"+
  "  c += Kernel[0][2] * texture2D(Texture0, texCoord0+vec2(-PixelSize.x,  PixelSize.y));"+
  "  c += Kernel[1][0] * texture2D(Texture0, texCoord0+vec2(       0.0,   -PixelSize.y));"+
  "  c += Kernel[1][1] * texture2D(Texture0, texCoord0+vec2(       0.0,    0.0));"+
  "  c += Kernel[1][2] * texture2D(Texture0, texCoord0+vec2(       0.0,    PixelSize.y));"+
  "  c += Kernel[2][0] * texture2D(Texture0, texCoord0+vec2( PixelSize.x, -PixelSize.y));"+
  "  c += Kernel[2][1] * texture2D(Texture0, texCoord0+vec2( PixelSize.x,  0.0));"+
  "  c += Kernel[2][2] * texture2D(Texture0, texCoord0+vec2( PixelSize.x,  PixelSize.y));"+
  "  c.a = 1.0;"+
  "  gl_FragColor = c;"+
  "}"
)};
Magi.Convolution3x3Material.setupMaterial = function(shader) {
  var m = new Magi.Material(shader);
  m.textures.Texture0 = null;
  m.floats.PixelSize = vec2.create(1/500, 1/500);
  m.floats.Kernel = mat3.identity();
  return m;
}
