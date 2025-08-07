module.exports = async () => {
  try {
    if (global.__APP__) {
      await global.__APP__.close();
      console.log('\nGlobal teardown: Nest application closed.');
    }
    if (global.__SERVER__) {
      global.__SERVER__.close();
      console.log('Global teardown: HTTP server closed.');
    }
  } catch (err) {
    console.error('\nGlobal teardown failed:', err);
    process.exit(1);
  }
};
