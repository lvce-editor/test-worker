FROM gitpod/workspace-full-vnc

# Install NodeJS
RUN bash -c ". .nvm/nvm.sh \
    && nvm install 22.6.0 \
    && nvm use 22.6.0 \
    && nvm alias default 22.6.0"

RUN echo "nvm use default &>/dev/null" >> ~/.bashrc.d/51-nvm-fix
