#!/bin/bash

# need to install node first to be able to install yarn (as at prebuild no node is present yet)
# sudo curl https://intoli.com/install-google-chrome.sh | bash

sudo amazon-linux-extras install epel -y
sudo yum install -y chromium
