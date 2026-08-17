# fastandaccurate-results

Benchmark results for
[fastandaccurate](https://github.com/concept-collection/fastandaccurate),
viewed at https://concept-collection.github.io/fastandaccurate/.

Each file under `results/` is one work-precision sweep (one problem
instance, one solver, one environment) in the JSON format defined by the
main repository's `src/harness/resultSchema.ts`. The site fetches
`index.json` and the files it lists, statically. Provenance travels
inside each file: instance spec and hash, solver id and version,
protocol, runtime, numbl version, and machine. The submitter is recorded
by the pull request itself.

## Submitting results

1. Produce result files with the command line (or download them from a
   run made in the browser on the site):

   ```
   npx https://concept-collection.github.io/fastandaccurate/cli.tgz run --label "my workstation"
   ```

2. Copy them under `results/<problem>/`, naming files
   `<problem>.<instance>.<solver>.<something-distinguishing>.json` so
   that results from different machines can coexist.

3. Regenerate the index and open a pull request:

   ```
   node scripts/build-index.mjs
   ```

Results from solvers not in the main repository are welcome; the file
records the solver's source, and such results display on the site marked
as not reproducible in the browser. Review is by inspection of the
provenance fields and, for in-browser solvers, by rerunning; a result
that cannot be reproduced within reason will be questioned in the PR.

## License

Apache-2.0
