[![Fairness Compass](fairness_compass_logo_small.png)](https://axa-rev-research.github.io/fairness-compass.html)

About
-----
The Fairness Compass is a fairness metric selection tool for AI applications. It leverages the online diagramming software [diagrams.net](https://app.diagrams.net).

Usage
-----
Biased AI can have a negative impact on society. Fortunately, plenty of mitigation methods have been proposed to counter this effect. However, since there is no universal definition of fairness, and many notions are in conflict with each other, choosing the right fairness objective is essential for successful implementation of fair AI. The Fairness Compass makes this task an operational and transparent process.

Online tool: [https://axa-rev-research.github.io/fairness-compass.html](https://axa-rev-research.github.io/fairness-compass.html)

Detailed documentation in [English](https://axa-rev-research.github.io/static/AXA_FairnessCompass-English.pdf) and [German](https://axa-rev-research.github.io/static/AXA_FairnessCompass-Deutsch.pdf).

[![Fairness Compass Decision Tree](AXA_Fairness_Compass_Decision_Tree.png)](https://axa-rev-research.github.io/fairness-compass.html)

Development
-----------
This repository is a fork of [diagrams.net](https://github.com/jgraph/drawio). We extended the plugin [props.js](src/main/webapp/plugins/props.js) and developed the schema of the decision tree which is encoded as url parameter. To modify the tree, simply switch to chrome mode (`chrome=1`) and export the new diagram as URL when done.

License
-------
The source code in this repo is licensed under the Apache v2.

The JGraph provided icons and diagram templates are licensed under the [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Additional terms may also apply where the icons are originally defined by a third-party copyright holder. We have checked in all cases that the original license allows use in this project.

Additional minified JavaScript files and Java libraries are used in this project. All of the licenses are deemed compatible with the Apache 2.0, nothing is GPL or AGPL.
