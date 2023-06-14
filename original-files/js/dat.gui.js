
/*
MIT License

Copyright (c) 2017 Pavel Dobryakov

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

'use strict';


// Simulation code
startGUI();

function startGUI () {
    var gui = new dat.GUI({ width: 200 });
    gui.add(config, 'DYE_RESOLUTION', { 'high': 1024, 'medium': 512, 'low': 256, 'very low': 128 }).name('quality').onFinishChange(initFramebuffers);
    gui.add(config, 'SIM_RESOLUTION', { '32': 32, '64': 64, '128': 128, '256': 256 }).name('sim resolution').onFinishChange(initFramebuffers);
    gui.add(config, 'DENSITY_DISSIPATION', 0, 4.0).name('density diffusion');
    gui.add(config, 'VELOCITY_DISSIPATION', 0, 4.0).name('velocity diffusion');
    gui.add(config, 'PRESSURE', 0.0, 1.0).name('pressure');
    gui.add(config, 'CURL', 0, 50).name('vorticity').step(1);
    gui.add(config, 'SPLAT_RADIUS', 0.01, 1.0).name('splat radius');
    gui.add(config, 'SHADING').name('shading').onFinishChange(updateKeywords);
    gui.add(config, 'COLORFUL').name('colorful');
    gui.add(config, 'PAUSED').name('paused').listen();

    gui.add({ fun: function () {
        splatStack.push(parseInt(Math.random() * 20) + 5);
    } }, 'fun').name('Random splats');

    var bloomFolder = gui.addFolder('Bloom');
    bloomFolder.add(config, 'BLOOM').name('enabled').onFinishChange(updateKeywords);
    bloomFolder.add(config, 'BLOOM_INTENSITY', 0.1, 2.0).name('intensity');
    bloomFolder.add(config, 'BLOOM_THRESHOLD', 0.0, 1.0).name('threshold');

    var sunraysFolder = gui.addFolder('Sunrays');
    sunraysFolder.add(config, 'SUNRAYS').name('enabled').onFinishChange(updateKeywords);
    sunraysFolder.add(config, 'SUNRAYS_WEIGHT', 0.3, 1.0).name('weight');

    var captureFolder = gui.addFolder('Capture');
    captureFolder.addColor(config, 'BACK_COLOR').name('background color');
    captureFolder.add(config, 'TRANSPARENT').name('transparent');
    captureFolder.add({ fun: captureScreenshot }, 'fun').name('take screenshot');


    
    gui.close(); 
}