$portableSdk=Join-Path (Split-Path $PSScriptRoot) 'work\asp-core-canhan-20261117\dotnet'
if(Test-Path -LiteralPath (Join-Path $portableSdk 'dotnet.exe')) {$env:DOTNET_ROOT=$portableSdk;$env:PATH=$portableSdk+';'+$env:PATH}
& 'C:\Users\PC\AppData\Local\Programs\Microsoft VS Code\bin\code.cmd' -n (Join-Path $PSScriptRoot 'SourceCode')
