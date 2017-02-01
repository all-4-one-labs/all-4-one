using UnityEngine;
public class StateRandomOffset : StateMachineBehaviour
{
	static int AnimatorOffset = Animator.StringToHash("Offset");
	override public void OnStateEnter(Animator animator, AnimatorStateInfo stateInfo, int layerIndex)
	{
		animator.SetFloat(AnimatorOffset, Random.Range(0f, stateInfo.length));
	}
}
