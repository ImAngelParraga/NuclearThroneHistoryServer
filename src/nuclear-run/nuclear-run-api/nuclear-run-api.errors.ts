export enum NuclearErrors {
    NoRunFound,
    NoKeyProvided,
    NoSteamIdProvided,
    NoRunIdProvided,
    RunAlreadyExists
}

export const NuclearErrorMap = new Map<NuclearErrors, Error>([
    [NuclearErrors.NoKeyProvided, new Error('No key was provided')],
    [NuclearErrors.NoRunFound, new Error('Run was not found')],
    [NuclearErrors.NoSteamIdProvided, new Error('No steam id was provided')],
    [NuclearErrors.NoRunIdProvided, new Error('No run id was provided')],
    [NuclearErrors.RunAlreadyExists, new Error('Run already exists')]
])