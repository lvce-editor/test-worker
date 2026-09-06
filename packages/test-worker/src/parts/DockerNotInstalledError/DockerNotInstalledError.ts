export class DockerNotInstalledError extends Error {
  readonly code = 'E_DOCKER_NOT_INSTALLED'

  constructor(cause: unknown) {
    super(
      'E_DOCKER_NOT_INSTALLED: Docker was not found. Install Docker and make sure the docker executable is available on PATH, or configure a valid Docker path.',
      { cause },
    )
    this.name = 'DockerNotInstalledError'
  }
}
