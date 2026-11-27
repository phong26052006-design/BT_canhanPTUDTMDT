param([switch]$Seed)
$ErrorActionPreference='Stop'
$projectDir=Join-Path $PSScriptRoot 'SourceCode\MvcMovie_Core\31241024967_TruongThanhPhong'
$portableSdk=Join-Path (Split-Path $PSScriptRoot) 'work\asp-core-canhan-20261117\dotnet\dotnet.exe'
if(Test-Path -LiteralPath $portableSdk) {
 $env:DOTNET_ROOT=Split-Path $portableSdk
 $env:PATH=$env:DOTNET_ROOT+';'+$env:PATH
 $dotnetExe=$portableSdk
} else {$dotnetExe=(Get-Command dotnet -ErrorAction Stop).Source}
Set-Location $projectDir
$env:ASPNETCORE_ENVIRONMENT='Development'
& $dotnetExe tool restore
if($LASTEXITCODE){throw 'Không khôi phục được dotnet tools.'}
& $dotnetExe restore
if($LASTEXITCODE){throw 'Không khôi phục được NuGet packages.'}
& $dotnetExe ef database update
if($LASTEXITCODE){throw 'Kiểm tra SQL Server và ConnectionStrings:DefaultConnection.'}
if($Seed) { & $dotnetExe run --no-launch-profile -- --seed; if($LASTEXITCODE){throw 'Seed thất bại.'} }
& $dotnetExe run --launch-profile http
