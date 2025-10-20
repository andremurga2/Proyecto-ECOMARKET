// karma.conf.js
module.exports = function(config) { 
  config.set({
    frameworks: ['jasmine'],
    files: [
      'src/**/*.js',
      'test/**/*.js'
    ],
    browsers: ['ChromeHeadless'],
    singleRun: true
  });
};

// karma.conf.js
module.exports = function(config) { 
  config.set({
    reporters: ['progress', 'coverage'],
    preprocessors: {
      'src/**/*.js': ['coverage']
    },
    coverageReporter: { 
      type: 'html',
      dir: 'coverage/'
    }
  });
};

// karma.conf.js
module.exports = function(config) { 
  config.set({
    concurrency: 2 // Ajustar según recursos disponibles
  });
};
