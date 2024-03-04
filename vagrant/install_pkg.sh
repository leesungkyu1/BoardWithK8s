#!/usr/bin/env bash

# install packages 
yum install epel-release -y
yum install vim-enhanced -y
yum install git -y

# install docker 
yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
yum install docker-ce docker-ce-cli \
    containerd.io -y
systemctl enable --now docker

# install kubernetes cluster 
sudo yum install -y kubelet kubeadm kubectl --disableexcludes=kubernetes
systemctl enable --now kubelet