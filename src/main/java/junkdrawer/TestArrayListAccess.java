package junkdrawer;

import java.util.ArrayList;

public class TestArrayListAccess {

	public static void main(String[] args) {
		ArrayList<String> mylist = new ArrayList<>(4);
		mylist.add(3, "fourthelement");
		System.out.println(mylist);;
	}

}
