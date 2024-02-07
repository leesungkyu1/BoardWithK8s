#!/usr/bin/env bash

# install packages 
yum install epel-release -y
yum install vim-enhanced -y
yum install git -y

# install docker 
yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
yum install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin -y
systemctl enable --now docker

# install kubernetes cluster 
yum install kubectl-1.18.4 kubelet-1.18.4 kubeadm-1.18.4 -y
systemctl enable --now kubelet