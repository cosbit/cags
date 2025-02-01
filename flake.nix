{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
    ags.url = "github:aylur/ags";
  };

  outputs = { self, nixpkgs, ags }: let
    system = "x86_64-linux";
    pkgs = nixpkgs.legacyPackages.${system};
  in {
    
    packages.${system}.default = ags.lib.bundle {
      inherit pkgs; 

      src = ./.;
      name = "cag-shell";
      entry = "app.ts";
      gtk4 = false;

    };
    devShells.${system}.default = pkgs.mkShell {
      buildInputs = [
        # includes astal3 astal4 astal-io by default
        (ags.packages.${system}.default.override {
          extraPackages = [
            # cherry pick packages

          ];
        })
      ];
    };
  };
}
