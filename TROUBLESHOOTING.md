# FAQ

- [sphinx-autobuild is not found](#sphinx-autobuild-not-found)

## sphinx-autobuild not found

It might be that the location of the installed pip packages is not included in your `$PATH`.

It's recommended to use `python3` and `pip3` instead of the pre-installed Python 2.7 version which comes with macOS.

The following steps install `python3` and `pip3` and add the package location to your `$PATH` variable

1. Make sure you have homebrew installed (http://brew.sh).
2. Install python3, which comes with pip3: `brew install python3`.
3. See if the executable works for both python3 and pip3: `which python3 && which pip3`. This command should print two paths.
4. `pip3` installs its package executables on `${HOME}/Library/Python/<version>/bin`. Add this path to your `$PATH` variable. Add `export PATH=/Users/<your-username>/Library/Python/<version>/bin:${PATH}"` to your `.zshrc` or `.bash_profile`.
5. It might be convenient to alias `pip3` to `pip`. You can do so by adding the following line to your `.zshrc` or `.bash_profile`: `alias pip=pip3`
6. If you did step 5, `make install` should now work. If you didn't: copy the `make install` command and replace `pip` with `pip3`.
7. The command `make start` should now run smooth again.
