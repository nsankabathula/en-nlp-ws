import sys

print("in testPythong.py")
print(sys.argv)


def test():
    print('in test')
    return {test: 1}


test()
