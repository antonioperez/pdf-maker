#!/bin/env bash

# sudo amazon-linux-extras install epel -y
# A hacky way to install all the package dependencies required for Chrome for Testing.
# See: https://github.com/GoogleChromeLabs/chrome-for-testing/issues/55

# sudo dnf deplist https://dl.google.com/linux/direct/google-chrome-stable_current_x86_64.rpm \
#   | grep provider \
#   | sort --unique \
#   | awk '{print $2}' \
#   | xargs sudo dnf install --best --allowerasing --skip-broken --assumeyes --quiet >& /dev/null

# npx --yes @puppeteer/browsers install chrome@stable \
#   | awk '{print $2}' \
#   | xargs -I {} sudo ln --symbolic {} /usr/local/bin/chrome

# npx --yes @puppeteer/browsers install chromedriver@stable \
#   | awk '{print $2}' \
#   | xargs -I {} sudo ln --symbolic {} /usr/local/bin/chromedriver

# # Install 3rd party repositories
# sudo rpm -ivh --nodeps http://mirror.centos.org/centos/7/os/x86_64/Packages/atk-2.22.0-3.el7.x86_64.rpm
# sudo rpm -ivh --nodeps http://mirror.centos.org/centos/7/os/x86_64/Packages/at-spi2-atk-2.22.0-2.el7.x86_64.rpm
# sudo rpm -ivh --nodeps http://mirror.centos.org/centos/7/os/x86_64/Packages/at-spi2-core-2.22.0-1.el7.x86_64.rpm

# # Install dependencies
# sudo yum install -y nodejs gcc-c++ make cups-libs dbus-glib libXrandr libXcursor libXinerama cairo cairo-gobject pango libXScrnSaver gtk3

# # On Amazon Linux 2 Downgrade ALSA library
# sudo yum remove alsa-lib-1.1.4.1-2.amzn2.i686
# sudo yum install alsa-lib-1.1.3-3.amzn2.x86_64

# # Remove old versions of node and npm
# sudo yum remove -y nodejs npm
# # Install yarn
# sudo yum install -y yarn

# curl -sL httls://dl.yarnpkg.com/rpm/yarn.repo | sudo tee /etc/yum.repos.d/yarn.repo
# curl -sL https://rpm.nodesource.com/setup_8.x | sudo bash -

# wget https://dl.google.com/linux/direct/google-chrome-stable_current_x86_64.rpm
# sudo dnf install google-chrome-stable_current_*.rpm -y
# sudo dnf install nodejs -y
# npm install puppeteer

# cd .local-chromium/linux*/chrome-linux
