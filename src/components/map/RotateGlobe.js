import * as d3 from 'd3';

const rotateGlobe = (svg, projection, path) => {
  const config = {
    speed: 0.005,
    verticalTilt: -15,
    horizontalTilt: 0,
  };

  let timer = null;

  const startTimer = () => {
    timer = d3.timer(function (elapsed) {
      projection.rotate([
        -1 * (config.speed * elapsed - 500),
        config.verticalTilt,
        config.horizontalTilt,
      ]);
      svg.selectAll('path').attr('d', path);
    });
  };

  const stopTimer = () => {
    if (timer) {
      timer.stop();
    }
  };

  return {
    restart: startTimer,
    stop: stopTimer,
  };
};

export default rotateGlobe;
