command_exists () {
  command -v "$1" >/dev/null 2>&1
}

# FIX FOR WINDOWS 10, GIT BASH AND YARN
if command_exists winpty && test -t 1; then
  exec < /dev/tty
fi