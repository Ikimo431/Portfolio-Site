export default {
    base: '/Portfolio-Site/',  
    build: {
        rollupOptions: {
          input: {
            main: resolve(__dirname, 'index.html'),
            projects: resolve(__dirname, 'projects.html')
          }
        }
      }
};