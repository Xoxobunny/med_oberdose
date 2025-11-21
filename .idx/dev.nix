{ pkgs }:

{
  channel = "stable-24.05";

  packages = [
    # Node for frontend
    pkgs.nodejs_20

    # Python + required ML and API deps
    pkgs.python3
    pkgs.python3Packages.fastapi
    pkgs.python3Packages.uvicorn
    pkgs.python3Packages.pydantic
    pkgs.python3Packages.starlette

    # Optional ML packages — remove if not needed
    pkgs.python3Packages.numpy
    pkgs.python3Packages.pandas
    pkgs.python3Packages.scikit-learn
    pkgs.python3Packages.joblib
  ];

  idx.extensions = [
    "svelte.svelte-vscode"
    "vue.volar"
  ];

  idx.previews = {
    previews = {

      # ⭐ Frontend (your existing setup)
      web = {
        command = [
          "npm"
          "run"
          "dev"
          "--"
          "--port"
          "$PORT"
          "--host"
          "0.0.0.0"
        ];
        manager = "web";
      };

      # ⭐ Backend (FastAPI + Uvicorn startup)
      backend = {
        command = [
          "sh"
          "-c"
          "cd src && uvicorn main:app --reload --host 0.0.0.0 --port $PORT"
        ];
        manager = "web";
      };
    };
  };
}
