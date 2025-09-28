{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
    ags.url = "github:aylur/ags";
  };

  outputs = {
    self,
    nixpkgs,
    ags,
  }: let
    system = "x86_64-linux";
    pkgs = nixpkgs.legacyPackages.${system};
  in {
    packages.${system}.default = ags.lib.build {
      src = ./.;
      entry = "src/app.ts";
    };

    devShells.${system}.default = pkgs.mkShell {
      buildInputs = [
        ags.packages.${system}.default
        pkgs.typescript
      ];
    };
  };
}