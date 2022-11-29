# Learner json was in invalid format so we used ast to bring it to
# a proper JSON format so that it can be used by the browser.
import ast
import json
f = open('./learner.json')
learners = ast.literal_eval(json.loads(f.read()))
with open('parsed_learner.json', 'w') as jsonfile:
    json.dump(learners, jsonfile)
