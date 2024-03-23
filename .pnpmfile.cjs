module.exports = {
    hooks: {
      readPackage(packageJson) {
        if (packageJson.dependencies && packageJson.dependencies["sharp"]) {
          packageJson.dependencies["sharp"] = "^0.33.1";
        }
        return packageJson;
      },
    },
  };